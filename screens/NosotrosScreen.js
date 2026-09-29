import { Ionicons } from '@expo/vector-icons';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NosotrosScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={styles.title}>Nosotros</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ingeniero Jan Michael Pérez Feliz</Text>
        <Text style={styles.cardText}>Desarrollador de TechVision RD, plataforma de transformación digital para PyMEs dominicanas.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>TechVision RD</Text>
        <Text style={styles.cardText}>Somos un equipo dedicado a la transformación digital de PyMEs dominicanas, ofreciendo soluciones de software accesibles y adaptadas a la realidad del mercado local.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contacto</Text>

        <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL('https://wa.me/18494093006')}>
          <Ionicons name="logo-whatsapp" size={20} color="#25D366" style={styles.contactIcon} />
          <Text style={styles.contactText}>+1 (849) 409-3006</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL('mailto:jan9506xx@gmail.com')}>
          <Ionicons name="mail" size={20} color="#6366f1" style={styles.contactIcon} />
          <Text style={styles.contactText}>jan9506xx@gmail.com</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL('mailto:100059326@p.uapa.edu.do')}>
          <Ionicons name="school" size={20} color="#6366f1" style={styles.contactIcon} />
          <Text style={styles.contactText}>100059326@p.uapa.edu.do</Text>
        </TouchableOpacity>

        <View style={styles.contactRow}>
          <Ionicons name="location" size={20} color="#94a3b8" style={styles.contactIcon} />
          <Text style={styles.contactText}>Santiago de los Caballeros, RD</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tecnologías del proyecto</Text>
        <Text style={styles.cardText}>App construida con React Native + Expo. Backend y sitio web principal en Node.js/PostgreSQL sobre AWS.</Text>
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
  contactRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  contactIcon: { marginRight: 10 },
  contactText: { fontSize: 14, color: '#e2e8f0' },
});