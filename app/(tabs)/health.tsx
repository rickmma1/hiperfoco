import { useState } from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import { Card } from '@/components/Card';
import { WarningBanner } from '@/components/WarningBanner';
import { addBpReading, addSymptomCheck, triageLevel } from '@/services/healthService';

const defaultSymptoms = {
  chestPain: false,
  shortnessBreath: false,
  fainting: false,
  intensePalpitations: false,
  severeAbdominalPain: false,
  persistentVomiting: false,
  jaundiceSigns: false,
  severeHeadacheVision: false,
  majorSwellingLegPain: false,
  severeMoodChange: false,
  hypoglycemiaSigns: false,
  severeSkinInfection: false
};

export default function HealthScreen() {
  const [symptoms, setSymptoms] = useState(defaultSymptoms);
  const level = triageLevel(symptoms);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#030712', padding: 12 }}>
      <WarningBanner text="Não é aconselhamento médico. Isso não é diagnóstico." />
      <Card>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Pressão arterial</Text>
        <Pressable
          style={{ backgroundColor: '#2563eb', borderRadius: 8, padding: 10, marginTop: 8 }}
          onPress={() =>
            addBpReading({ measuredAt: new Date().toISOString(), systolic: 120, diastolic: 80, context: 'repouso' })
          }
        >
          <Text style={{ color: '#fff' }}>Salvar leitura exemplo 120/80</Text>
        </Pressable>
        <Text style={{ color: '#d1d5db', marginTop: 8 }}>Leve estes dados ao médico para análise clínica.</Text>
      </Card>
      <Card>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Checklist de sintomas</Text>
        {Object.entries(symptoms).map(([key, value]) => (
          <Pressable
            key={key}
            style={{ backgroundColor: value ? '#7f1d1d' : '#374151', borderRadius: 8, padding: 8, marginTop: 6 }}
            onPress={() => setSymptoms((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
          >
            <Text style={{ color: '#fff' }}>{key}</Text>
          </Pressable>
        ))}
        <Text style={{ color: '#fbbf24', marginTop: 10 }}>Saída: {level}. Isso não é diagnóstico.</Text>
        <Pressable
          style={{ backgroundColor: '#2563eb', borderRadius: 8, padding: 10, marginTop: 8 }}
          onPress={() => addSymptomCheck({ ...symptoms, checkedAt: new Date().toISOString() })}
        >
          <Text style={{ color: '#fff' }}>Salvar checklist</Text>
        </Pressable>
      </Card>
    </ScrollView>
  );
}
