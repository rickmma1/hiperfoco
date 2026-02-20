import { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card } from '@/components/Card';
import { WarningBanner } from '@/components/WarningBanner';
import { getMetabolicEstimate } from '@/services/profileService';

export default function DashboardScreen() {
  const [metabolism, setMetabolism] = useState<any>(null);

  useEffect(() => {
    getMetabolicEstimate().then(setMetabolism).catch(console.error);
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#030712', padding: 12 }}>
      <WarningBanner />
      <Card>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Metabolismo estimado</Text>
        <Text style={{ color: '#d1d5db' }}>Método: {metabolism?.method ?? 'Preencha idade/sexo ou BF%'}</Text>
        <Text style={{ color: '#d1d5db' }}>BMR: {metabolism?.bmr ?? '-'} kcal</Text>
        <Text style={{ color: '#d1d5db' }}>
          TDEE: {metabolism?.tdeeRange?.low ?? '-'} a {metabolism?.tdeeRange?.high ?? '-'} kcal
        </Text>
        <Text style={{ color: '#fca5a5', marginTop: 8 }}>
          Substâncias NÃO entram no cálculo; este app não estima efeitos farmacológicos.
        </Text>
      </Card>
      <Card>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Triagem de alerta</Text>
        <Text style={{ color: '#d1d5db' }}>Se houver dor no peito, falta de ar, desmaio ou piora súbita: procure urgência.</Text>
        <Text style={{ color: '#d1d5db', marginTop: 8 }}>Isso não é diagnóstico.</Text>
      </Card>
    </ScrollView>
  );
}
