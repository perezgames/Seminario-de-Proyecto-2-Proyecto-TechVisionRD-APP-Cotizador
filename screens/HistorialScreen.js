import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  eliminarCotizacion,
  obtenerCotizaciones,
} from '../db/database';

function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(val);
}

function formatFecha(iso) {
  const d = new Date(iso);

  return (
    d.toLocaleDateString('es-DO') +
    ' ' +
    d.toLocaleTimeString('es-DO', {
      hour: '2-digit',
      minute: '2-digit',
    })
  );
}

function generarFacturaHTML(cotizacion) {
  const {
    id,
    cliente,
    dev_rate,
    dev_hours,
    design_hours,
    infra_months,
    license_rate,
    qa_hours,
    training_sessions,
    total,
    fecha,
  } = cotizacion;

  const costDev = dev_hours * dev_rate;
  const costDesign = design_hours * (dev_rate * 0.8);
  const costInfra = infra_months * 40;
  const costLicenses = infra_months * license_rate;
  const costQA = qa_hours * (dev_rate * 0.7);
  const costTraining = training_sessions * 120;
  const costMaintenance =
    dev_rate * 4 * infra_months;

  const numeroFactura =
    `TV-${new Date(fecha).getFullYear()}-${String(id).padStart(4, '0')}`;

  return `
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />

  <style>

    @page {
      size: A4;
      margin: 12mm;
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #1e293b;
      font-family: Arial, Helvetica, sans-serif;
    }

    body {
      font-size: 10px;
    }

    .page {
      width: 100%;
      max-width: 100%;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 3px solid #6366f1;
      padding-bottom: 10px;
      margin-bottom: 13px;
    }

    .logo {
      width: 185px;
      height: 58px;
      display: flex;
      align-items: center;
      font-size: 22px;
      font-weight: bold;
      color: #0f172a;
    }

    .invoice-info {
      text-align: right;
      color: #475569;
      line-height: 15px;
      font-size: 10px;
    }

    .invoice-title {
      font-size: 20px;
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 2px;
    }

    .client-box {
      background: #f8fafc;
      border-left: 4px solid #6366f1;
      padding: 9px 12px;
      margin-bottom: 13px;
    }

    .client-label {
      font-size: 8px;
      color: #64748b;
      text-transform: uppercase;
      margin-bottom: 2px;
    }

    .client-name {
      font-size: 14px;
      font-weight: bold;
      color: #0f172a;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 11px;
    }

    th {
      background: #1e293b;
      color: #ffffff;
      padding: 7px 8px;
      text-align: left;
      font-size: 9px;
    }

    td {
      padding: 6px 8px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 9px;
      line-height: 12px;
    }

    td:last-child,
    th:last-child {
      text-align: right;
    }

    .total-box {
      width: 230px;
      margin-left: auto;
      background: #f8fafc;
      border-radius: 6px;
      padding: 9px 11px;
      margin-bottom: 13px;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
    }

    .grand-total {
      border-top: 2px solid #6366f1;
      padding-top: 6px;
      margin-top: 6px;
      font-size: 17px;
      font-weight: bold;
      color: #6366f1;
    }

    .agreement {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 9px 11px;
      margin-bottom: 18px;
    }

    .agreement-title {
      font-size: 11px;
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 4px;
    }

    .agreement-text {
      font-size: 8.5px;
      line-height: 12px;
      color: #475569;
    }

    .signatures {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      margin-bottom: 15px;
    }

    .signature {
      width: 42%;
      text-align: center;
    }

    .signature-space {
      height: 30px;
    }

    .signature-line {
      border-top: 1px solid #334155;
      margin-bottom: 5px;
    }

    .signature-title {
      font-size: 9px;
      font-weight: bold;
      color: #0f172a;
    }

    .signature-detail {
      font-size: 8px;
      color: #64748b;
      margin-top: 3px;
    }

    .footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 8px;
      text-align: center;
      color: #64748b;
      font-size: 8px;
      line-height: 11px;
    }

  </style>
</head>

<body>

  <div class="page">

    <div class="header">

      <div class="logo">
        TechVision
      </div>

      <div class="invoice-info">

        <div class="invoice-title">
          COTIZACIÓN
        </div>

        <div>
          No. ${numeroFactura}
        </div>

        <div>
          ${formatFecha(fecha)}
        </div>

      </div>

    </div>

    <div class="client-box">

      <div class="client-label">
        Cliente / Proyecto
      </div>

      <div class="client-name">
        ${cliente}
      </div>

    </div>

    <table>

      <thead>

        <tr>
          <th>Concepto</th>
          <th>Descripción</th>
          <th>Total</th>
        </tr>

      </thead>

      <tbody>

        <tr>
          <td>Codificación</td>
          <td>
            ${dev_hours} horas × ${formatCurrency(dev_rate)}
          </td>
          <td>
            ${formatCurrency(costDev)}
          </td>
        </tr>

        <tr>
          <td>Diseño de Interfaz</td>
          <td>
            ${design_hours} horas
          </td>
          <td>
            ${formatCurrency(costDesign)}
          </td>
        </tr>

        <tr>
          <td>Servidores Cloud</td>
          <td>
            ${infra_months} meses
          </td>
          <td>
            ${formatCurrency(costInfra)}
          </td>
        </tr>

        <tr>
          <td>Licencias & Integración</td>
          <td>
            ${infra_months} meses
          </td>
          <td>
            ${formatCurrency(costLicenses)}
          </td>
        </tr>

        <tr>
          <td>Control de Calidad (QA)</td>
          <td>
            ${qa_hours} horas
          </td>
          <td>
            ${formatCurrency(costQA)}
          </td>
        </tr>

        <tr>
          <td>Capacitación</td>
          <td>
            ${training_sessions} sesiones
          </td>
          <td>
            ${formatCurrency(costTraining)}
          </td>
        </tr>

        <tr>
          <td>Soporte Técnico</td>
          <td>
            ${infra_months} meses
          </td>
          <td>
            ${formatCurrency(costMaintenance)}
          </td>
        </tr>

      </tbody>

    </table>

    <div class="total-box">

      <div class="total-row">
        <span>Total cotización</span>
        <span>${formatCurrency(total)}</span>
      </div>

      <div class="total-row grand-total">
        <span>TOTAL</span>
        <span>${formatCurrency(total)}</span>
      </div>

    </div>

    <div class="agreement">

      <div class="agreement-title">
        Aceptación de la cotización
      </div>

      <div class="agreement-text">
        Mediante la firma del presente documento, ambas partes
        manifiestan haber revisado y aceptado el alcance, servicios,
        condiciones y monto establecidos en esta cotización.
        La firma representa la conformidad con lo aquí acordado
        para la ejecución del proyecto descrito.
      </div>

    </div>

    <div class="signatures">

      <div class="signature">

        <div class="signature-space"></div>

        <div class="signature-line"></div>

        <div class="signature-title">
          FIRMA DEL CLIENTE
        </div>

        <div class="signature-detail">
          Nombre: ______________________________
        </div>

        <div class="signature-detail">
          Fecha: _______________________________
        </div>

      </div>

      <div class="signature">

        <div class="signature-space"></div>

        <div class="signature-line"></div>

        <div class="signature-title">
          FIRMA DE TECHVISION
        </div>

        <div class="signature-detail">
          Responsable: __________________________
        </div>

        <div class="signature-detail">
          Fecha: _______________________________
        </div>

      </div>

    </div>

    <div class="footer">
      Gracias por confiar en TechVision.<br />
      Documento generado mediante el sistema de cotización TechVision.
    </div>

  </div>

</body>
</html>
  `;
}

export default function HistorialScreen() {
  const [items, setItems] = useState([]);

  const cargarCotizaciones = useCallback(
    async () => {
      try {
        const cotizaciones =
          await obtenerCotizaciones();

        setItems(cotizaciones);
      } catch (error) {
        console.error(
          'Error cargando cotizaciones:',
          error
        );

        setItems([]);
      }
    },
    []
  );

  useFocusEffect(
    useCallback(() => {
      cargarCotizaciones();
    }, [cargarCotizaciones])
  );

  const borrar = (id, cliente) => {
    Alert.alert(
      'Eliminar cotización',
      `¿Eliminar la cotización de "${cliente}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await eliminarCotizacion(id);
              await cargarCotizaciones();
            } catch (error) {
              console.error(
                'Error eliminando cotización:',
                error
              );
            }
          },
        },
      ]
    );
  };

  const imprimirFactura = async (cotizacion) => {
    try {
      const html =
        generarFacturaHTML(cotizacion);

      if (Platform.OS === 'web') {
        const ventana =
          window.open('', '_blank');

        if (!ventana) {
          Alert.alert(
            'No se pudo abrir la factura',
            'El navegador bloqueó la ventana de impresión.'
          );

          return;
        }

        ventana.document.write(html);
        ventana.document.close();
        ventana.focus();
        ventana.print();

        return;
      }

      await Print.printAsync({
        html,
      });

    } catch (error) {
      console.error(
        'Error generando factura:',
        error
      );

      Alert.alert(
        'Error',
        'No fue posible generar la factura.'
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
    >
      <Text style={styles.title}>
        Historial
      </Text>

      <Text style={styles.subtitle}>
        Cotizaciones guardadas en la base de datos local del dispositivo.
      </Text>

      {items.length === 0 ? (
        <View style={styles.empty}>

          <Ionicons
            name="document-text-outline"
            size={40}
            color="#475569"
          />

          <Text style={styles.emptyText}>
            Aún no hay cotizaciones guardadas.
          </Text>

          <Text style={styles.emptyHint}>
            Crea una en la pestaña Cotizador y toca
            "Guardar cotización".
          </Text>

        </View>
      ) : (
        items.map((c) => (

          <View
            key={c.id}
            style={styles.card}
          >

            <View style={styles.cardHeader}>

              <Text style={styles.cliente}>
                {c.cliente}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  borrar(
                    c.id,
                    c.cliente
                  )
                }
              >
                <Ionicons
                  name="trash"
                  size={20}
                  color="#f87171"
                />
              </TouchableOpacity>

            </View>

            <Text style={styles.total}>
              {formatCurrency(c.total)}
            </Text>

            <Text style={styles.detalle}>
              {c.dev_hours} h desarrollo ·{' '}
              {c.design_hours} h diseño ·{' '}
              {c.infra_months} meses cloud ·{' '}
              {c.qa_hours} h QA
            </Text>

            <Text style={styles.fecha}>
              {formatFecha(c.fecha)}
            </Text>

            <TouchableOpacity
              style={styles.invoiceButton}
              onPress={() =>
                imprimirFactura(c)
              }
              activeOpacity={0.8}
            >

              <Ionicons
                name="print-outline"
                size={18}
                color="#fff"
                style={{
                  marginRight: 8,
                }}
              />

              <Text
                style={
                  styles.invoiceButtonText
                }
              >
                Imprimir factura
              </Text>

            </TouchableOpacity>

          </View>

        ))
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 40,
  },

  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 20,
  },

  empty: {
    alignItems: 'center',
    marginTop: 60,
  },

  emptyText: {
    color: '#cbd5e1',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },

  emptyHint: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  cliente: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    marginRight: 10,
  },

  total: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 6,
  },

  detalle: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 18,
  },

  fecha: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 8,
  },

  invoiceButton: {
    flexDirection: 'row',
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  invoiceButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});