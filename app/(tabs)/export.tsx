import { Pressable, ScrollView, Text } from 'react-native';
import { Card } from '@/components/Card';
import { WarningBanner } from '@/components/WarningBanner';
import { exportConsultPdf, exportCsv } from '@/services/exportService';

export default function ExportScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#030712', padding: 12 }}>
      <WarningBanner />
      <Card>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Preparação para consulta</Text>
        <Text style={{ color: '#d1d5db' }}>Checklist: peso, PA, sintomas, medicações/substâncias, perguntas para o médico.</Text>
        <Text style={{ color: '#d1d5db', marginTop: 8 }}>São tópicos para discutir, não lista obrigatória.</Text>
      </Card>
      <Card>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Exportação</Text>
        {[30, 60, 90].map((d) => (
          <Pressable
            key={d}
            style={{ backgroundColor: '#2563eb', borderRadius: 8, padding: 10, marginTop: 8 }}
            onPress={() => exportConsultPdf(d as 30 | 60 | 90)}
          >
            <Text style={{ color: '#fff' }}>Exportar PDF ({d} dias)</Text>
          </Pressable>
        ))}
        <Pressable style={{ backgroundColor: '#4b5563', borderRadius: 8, padding: 10, marginTop: 8 }} onPress={exportCsv}>
          <Text style={{ color: '#fff' }}>Exportar CSV (daily_logs, bp_readings, training_sessions, substances, symptoms)</Text>
        </Pressable>
      </Card>
    </ScrollView>
  );
}
