import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import { Card } from '@/components/Card';
import { WarningBanner } from '@/components/WarningBanner';
import { getTrainingSummary } from '@/services/trainingService';
import { estimateWeeklyVolume } from '@/utils/calculators';

export default function TrainingScreen() {
  const [summary, setSummary] = useState<any>({ sessions: [], exercises: [] });
  useEffect(() => {
    getTrainingSummary().then(setSummary).catch(console.error);
  }, []);

  const volume = estimateWeeklyVolume(
    summary.exercises.map((e: any) => ({ reps: e.reps, series: e.sets, loadKg: e.load_kg, muscleGroup: e.muscle_group || 'geral' }))
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#030712', padding: 12 }}>
      <WarningBanner />
      <Card>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Treino</Text>
        <Text style={{ color: '#d1d5db' }}>Sessões registradas: {summary.sessions.length}</Text>
        <Text style={{ color: '#d1d5db' }}>Insights seguros: consistência semanal e relação sono x desempenho (correlação simples).</Text>
      </Card>
      <Card>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Volume semanal estimado por grupamento</Text>
        {Object.entries(volume).map(([group, vol]) => (
          <Text key={group} style={{ color: '#d1d5db' }}>
            {group}: {Math.round(vol)} kg
          </Text>
        ))}
      </Card>
      <Pressable style={{ backgroundColor: '#374151', borderRadius: 8, padding: 10 }}>
        <Text style={{ color: '#fff' }}>Templates: criar / duplicar (estrutura pronta para expansão)</Text>
      </Pressable>
    </ScrollView>
  );
}
