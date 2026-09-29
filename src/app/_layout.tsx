import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#1e293b', borderTopColor: '#334155', height: 75, paddingBottom: 8, paddingTop: 8 },
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: '#64748b',
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Inicio', tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} /> }} />
        <Tabs.Screen name="servicios" options={{ title: 'Servicios', tabBarIcon: ({ color, size }) => <Ionicons name="briefcase" color={color} size={size} /> }} />
        <Tabs.Screen name="cotizador" options={{ title: 'Cotizador', tabBarIcon: ({ color, size }) => <Ionicons name="calculator" color={color} size={size} /> }} />
        <Tabs.Screen name="historial" options={{ title: 'Historial', tabBarIcon: ({ color, size }) => <Ionicons name="time" color={color} size={size} /> }} />
        <Tabs.Screen name="nosotros" options={{ title: 'Nosotros', tabBarIcon: ({ color, size }) => <Ionicons name="people" color={color} size={size} /> }} />
      </Tabs>
      <WhatsAppButton />
    </View>
  );
}