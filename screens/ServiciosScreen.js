import { Ionicons } from '@expo/vector-icons';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const servicios = [
  { title: 'Desarrollo a Medida', desc: 'Software diseñado específicamente para las necesidades de tu empresa.' },
  { title: 'Automatización de Procesos', desc: 'Reducimos el trabajo manual repetitivo con flujos automatizados.' },
  { title: 'Consultoría Digital', desc: 'Te guiamos en tu transformación digital paso a paso.' },
];

const equipo = [
  { nombre: 'Jan Michael Pérez Feliz', rol: 'Desarrollador' },
  { nombre: 'Claurileidy Coronado', rol: 'Marketing' },
  { nombre: 'Joel Pérez', rol: 'Administración y Finanzas' },
  { nombre: 'Daonil Montero', rol: 'Desarrollo Web' },
];

export default function ServiciosScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={styles.title}>Servicios</Text>
      {servicios.map((s, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.cardTitle}>{s.title}</Text>
          <Text style={styles.cardText}>{s.desc}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.moreButton}
        onPress={() => Linking.openURL('https://techvision-rd-100059326.web.app/')}
      >
        <Ionicons name="globe-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.moreButtonText}>Más información en nuestra página</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Nuestro Equipo</Text>
      <View style={styles.teamGrid}>
        {equipo.map((m, i) => (
          <View key={i} style={styles.teamCard}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color="#6366f1" />
            </View>
            <Text style={styles.teamName}>{m.nombre}</Text>
            <Text style={styles.teamRole}>{m.rol}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginTop: 40, marginBottom: 20 },
  card: { backgroundColor: '#1e293b', borderRadius: 12, padding: 16, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 8 },
  cardText: { fontSize: 14, color: '#cbd5e1', lineHeight: 20 },
  moreButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#6366f1', borderRadius: 10, padding: 14, marginTop: 8, marginBottom: 24 },
  moreButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 12 },
  teamGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  teamCard: { width: '48%', backgroundColor: '#1e293b', borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#0f172a', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  teamName: { fontSize: 13, fontWeight: '600', color: '#fff', textAlign: 'center' },
  teamRole: { fontSize: 11, color: '#94a3b8', textAlign: 'center', marginTop: 2 },
});