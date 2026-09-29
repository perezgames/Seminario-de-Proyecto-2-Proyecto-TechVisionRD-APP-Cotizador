import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { guardarCotizacion } from '../db/database';

function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(val);
}

export default function CotizadorScreen() {
  const [cliente, setCliente] = useState('');
  const [devRate, setDevRate] = useState(25);
  const [devHours, setDevHours] = useState(120);
  const [designHours, setDesignHours] = useState(40);
  const [infraMonths, setInfraMonths] = useState(6);
  const [licenseRate, setLicenseRate] = useState(45);
  const [qaHours, setQaHours] = useState(30);
  const [trainingSessions, setTrainingSessions] = useState(3);

  const costDev = devHours * devRate;
  const costDesign = designHours * (devRate * 0.8);
  const costInfra = infraMonths * 40;
  const costLicenses = infraMonths * licenseRate;
  const costQA = qaHours * (devRate * 0.7);
  const costTraining = trainingSessions * 120;
  const costMaintenance = (devRate * 4) * infraMonths;

  const total =
    costDev +
    costDesign +
    costInfra +
    costLicenses +
    costQA +
    costTraining +
    costMaintenance;

  const breakdown = [
    { label: 'Codificación', value: costDev },
    { label: 'Diseño de Interfaz', value: costDesign },
    { label: 'Servidores Cloud', value: costInfra },
    { label: 'Licencias & Integración', value: costLicenses },
    { label: 'Control de Calidad (QA)', value: costQA },
    { label: 'Capacitación Gremial', value: costTraining },
    { label: 'Soporte Técnico', value: costMaintenance },
  ];

  const guardar = async () => {
    const nombre = cliente.trim();

    if (!nombre) {
      Alert.alert(
        'Falta el nombre',
        'Escribe el nombre del cliente o proyecto para guardar la cotización.'
      );
      return;
    }

    try {
      await guardarCotizacion({
        cliente: nombre,
        devRate,
        devHours,
        designHours,
        infraMonths,
        licenseRate,
        qaHours,
        trainingSessions,
        total,
      });

      setCliente('');

      Alert.alert(
        'Cotización guardada',
        'La encuentras en la pestaña Historial.'
      );
    } catch (error) {
      console.error('Error guardando cotización:', error);

      Alert.alert(
        'Error',
        'No fue posible guardar la cotización.'
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Cotizador</Text>

      <Text style={styles.subtitle}>
        Ajusta los parámetros para simular el costo de tu proyecto.
      </Text>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>
          Presupuesto Estimado
        </Text>

        <Text style={styles.totalAmount}>
          {formatCurrency(total)}
        </Text>
      </View>

      <View style={styles.saveBox}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del cliente o proyecto"
          placeholderTextColor="#64748b"
          value={cliente}
          onChangeText={setCliente}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={guardar}
        >
          <Ionicons
            name="save"
            size={18}
            color="#fff"
            style={{ marginRight: 8 }}
          />

          <Text style={styles.saveText}>
            Guardar cotización
          </Text>
        </TouchableOpacity>
      </View>

      <SliderRow
        label="Tarifa del Programador"
        value={devRate}
        unit="USD"
        min={15}
        max={75}
        step={5}
        onChange={setDevRate}
      />

      <SliderRow
        label="Horas de Desarrollo"
        value={devHours}
        unit="horas"
        min={40}
        max={300}
        step={10}
        onChange={setDevHours}
      />

      <SliderRow
        label="Horas de Diseño UX/UI"
        value={designHours}
        unit="horas"
        min={10}
        max={100}
        step={5}
        onChange={setDesignHours}
      />

      <SliderRow
        label="Meses de Infraestructura Cloud"
        value={infraMonths}
        unit="meses"
        min={1}
        max={24}
        step={1}
        onChange={setInfraMonths}
      />

      <SliderRow
        label="Licencias & APIs"
        value={licenseRate}
        unit="USD/mes"
        min={10}
        max={200}
        step={5}
        onChange={setLicenseRate}
      />

      <SliderRow
        label="Horas de Pruebas (QA)"
        value={qaHours}
        unit="horas"
        min={10}
        max={100}
        step={5}
        onChange={setQaHours}
      />

      <SliderRow
        label="Sesiones de Capacitación"
        value={trainingSessions}
        unit="sesiones"
        min={1}
        max={10}
        step={1}
        onChange={setTrainingSessions}
      />

      <Text style={styles.sectionTitle}>
        Desglose Detallado
      </Text>

      {breakdown.map((b, i) => (
        <View
          key={i}
          style={styles.breakdownRow}
        >
          <Text style={styles.breakdownLabel}>
            {b.label}
          </Text>

          <Text style={styles.breakdownValue}>
            {formatCurrency(b.value)}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

function SliderRow({
  label,
  value,
  unit,
  min,
  max,
  step,
  onChange,
}) {
  return (
    <View style={styles.controlGroup}>
      <View style={styles.controlLabelRow}>
        <Text style={styles.controlLabel}>
          {label}
        </Text>

        <Text style={styles.controlValue}>
          {value} {unit}
        </Text>
      </View>

      <Slider
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="#6366f1"
        maximumTrackTintColor="#334155"
        thumbTintColor="#6366f1"
      />
    </View>
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

  totalCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },

  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366f1',
  },

  saveBox: {
    marginBottom: 24,
  },

  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },

  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#6366f1',
    borderRadius: 10,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  controlGroup: {
    marginBottom: 20,
  },

  controlLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  controlLabel: {
    color: '#e2e8f0',
    fontSize: 14,
  },

  controlValue: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 10,
    marginBottom: 12,
  },

  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },

  breakdownLabel: {
    color: '#cbd5e1',
    fontSize: 14,
  },

  breakdownValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
}); 