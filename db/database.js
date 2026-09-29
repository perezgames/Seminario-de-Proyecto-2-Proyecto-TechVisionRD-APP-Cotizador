import * as SQLite from 'expo-sqlite';

let db = null;

async function getDatabase() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('techvision.db');

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS cotizaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente TEXT NOT NULL,
        dev_rate INTEGER NOT NULL,
        dev_hours INTEGER NOT NULL,
        design_hours INTEGER NOT NULL,
        infra_months INTEGER NOT NULL,
        license_rate INTEGER NOT NULL,
        qa_hours INTEGER NOT NULL,
        training_sessions INTEGER NOT NULL,
        total REAL NOT NULL,
        fecha TEXT NOT NULL
      );
    `);
  }

  return db;
}

export async function guardarCotizacion(c) {
  const database = await getDatabase();

  await database.runAsync(
    `INSERT INTO cotizaciones
      (cliente, dev_rate, dev_hours, design_hours, infra_months, license_rate, qa_hours, training_sessions, total, fecha)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      c.cliente,
      c.devRate,
      c.devHours,
      c.designHours,
      c.infraMonths,
      c.licenseRate,
      c.qaHours,
      c.trainingSessions,
      c.total,
      new Date().toISOString()
    ]
  );
}

export async function obtenerCotizaciones() {
  const database = await getDatabase();

  return await database.getAllAsync(
    'SELECT * FROM cotizaciones ORDER BY id DESC'
  );
}

export async function eliminarCotizacion(id) {
  const database = await getDatabase();

  await database.runAsync(
    'DELETE FROM cotizaciones WHERE id = ?',
    [id]
  );
}