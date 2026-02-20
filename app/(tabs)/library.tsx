import { ScrollView, Text } from 'react-native';
import { Card } from '@/components/Card';
import { WarningBanner } from '@/components/WarningBanner';

export default function LibraryScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#030712', padding: 12 }}>
      <WarningBanner />
      <Card>
        <Text style={{ color: '#fff', fontWeight: '700' }}>1) Riscos gerais: agentes anabólicos/androgênicos</Text>
        <Text style={{ color: '#d1d5db' }}>
          Conteúdo educacional: possíveis impactos cardiovasculares, pressão arterial, perfil lipídico, fígado (quando aplicável), pele,
          fertilidade/eixo hormonal e saúde mental.
        </Text>
      </Card>
      <Card>
        <Text style={{ color: '#fff', fontWeight: '700' }}>2) GLP-1/antiobesidade (educacional)</Text>
        <Text style={{ color: '#d1d5db' }}>
          Efeitos gastrointestinais comuns, risco de desidratação, sinais de alerta para pancreatite/vesícula e sinais de hipoglicemia.
          Procure avaliação profissional em caso de sintomas.
        </Text>
      </Card>
      <Card>
        <Text style={{ color: '#fff', fontWeight: '700' }}>3) Como conversar com seu médico</Text>
        <Text style={{ color: '#d1d5db' }}>Leve histórico de peso, PA, sintomas, exames prévios e medicações/substâncias registradas.</Text>
      </Card>
      <Card>
        <Text style={{ color: '#fff', fontWeight: '700' }}>4) Glossário</Text>
        <Text style={{ color: '#d1d5db' }}>BMR: taxa metabólica basal. TDEE: gasto total diário estimado. RPE: percepção subjetiva de esforço.</Text>
      </Card>
    </ScrollView>
  );
}
