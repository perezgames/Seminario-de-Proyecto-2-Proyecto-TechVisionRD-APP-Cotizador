import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function InicioScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const textSlide = useRef(new Animated.Value(10)).current;
  const textPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 40, useNativeDriver: true }),
    ]).start();

    Animated.timing(textFade, { toValue: 1, duration: 900, delay: 300, useNativeDriver: true }).start();
    Animated.timing(textSlide, { toValue: 0, duration: 900, delay: 300, useNativeDriver: true }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -14, duration: 1400, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1400, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, { toValue: 1, duration: 2800, useNativeDriver: true }),
        Animated.timing(rotateAnim, { toValue: 0, duration: 2800, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 0.9, duration: 1400, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 1400, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(textPulse, { toValue: 0.6, duration: 1200, useNativeDriver: true }),
        Animated.timing(textPulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['-3deg', '3deg'] });

  const stats = [
    { icon: 'flash', label: 'Rápido', value: '100%' },
    { icon: 'shield-checkmark', label: 'Confiable', value: '24/7' },
    { icon: 'trending-up', label: 'Enfoque', value: 'PyMEs RD' },
  ];

  const features = [
    { icon: 'code-slash', text: 'Desarrollo de software a medida' },
    { icon: 'cloud', text: 'Infraestructura cloud escalable' },
    { icon: 'construct', text: 'Automatización de procesos' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.logoWrapper}>
        <Animated.View style={[styles.glow, { opacity: glowAnim }]} />
        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }, { translateY: floatAnim }, { rotate: spin }] }}>
          <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </Animated.View>
      </View>

      <Animated.Text
        style={[
          styles.appSignature,
          { opacity: Animated.multiply(textFade, textPulse), transform: [{ translateY: textSlide }] },
        ]}
      >
        TechVisionRD APP Cotizador{'\n'}by Ing. Jan M. Pérez
      </Animated.Text>

      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Transformación Digital para tu Negocio</Text>
        <Text style={styles.heroText}>Consultoría de software a medida y automatización inteligente de flujos de trabajo para PyMEs en la República Dominicana.</Text>
      </View>

      <View style={styles.statsRow}>
        {stats.map((s, i) => (
          <View key={i} style={styles.statCard}>
            <Ionicons name={s.icon} size={22} color="#6366f1" />
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>¿Qué hacemos?</Text>
      {features.map((f, i) => (
        <View key={i} style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <Ionicons name={f.icon} size={18} color="#6366f1" />
          </View>
          <Text style={styles.featureText}>{f.text}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/cotizador')}>
        <Ionicons name="calculator" size={18} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.ctaText}>Simula tu Presupuesto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20 },
  logoWrapper: { alignItems: 'center', justifyContent: 'center', marginTop: 40, marginBottom: 6, height: 110 },
  glow: { position: 'absolute', width: 160, height: 160, borderRadius: 80, backgroundColor: '#6366f1', opacity: 0.4 },
  logo: { width: 140, height: 140, borderRadius: 70 },
  appSignature: {
    fontSize: 15,
    color: '#a5b4fc',
    fontWeight: '800',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 22,
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  heroCard: { backgroundColor: '#1e293b', borderRadius: 14, padding: 18, marginBottom: 18, borderLeftWidth: 3, borderLeftColor: '#6366f1' },
  heroTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 8 },
  heroText: { fontSize: 14, color: '#94a3b8', lineHeight: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: '#1e293b', borderRadius: 12, padding: 12, alignItems: 'center', marginHorizontal: 4 },
  statValue: { fontSize: 15, fontWeight: '700', color: '#fff', marginTop: 6 },
  statLabel: { fontSize: 10, color: '#64748b', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 12 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  featureIcon: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#1e293b', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  featureText: { fontSize: 14, color: '#cbd5e1', flex: 1 },
  ctaButton: { flexDirection: 'row', backgroundColor: '#6366f1', borderRadius: 10, padding: 15, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});