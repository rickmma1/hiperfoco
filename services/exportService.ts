import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { getProfile, getMetabolicEstimate } from './profileService';
import { listDailyLogs } from './logsService';
import { getHealthData } from './healthService';
import { getTrainingSummary } from './trainingService';
import { listSubstances } from './substancesService';

const csvFromRows = (rows: any[]) => {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const body = rows.map((r) => headers.map((h) => JSON.stringify(r[h] ?? '')).join(',')).join('\n');
  return `${headers.join(',')}\n${body}`;
};

export const exportCsv = async () => {
  const [daily, health, training, substances] = await Promise.all([
    listDailyLogs(),
    getHealthData(),
    getTrainingSummary(),
    listSubstances()
  ]);

  const files = {
    daily_logs: daily,
    bp_readings: health.bp,
    training_sessions: training.sessions,
    substances,
    symptoms: health.symptoms
  };

  for (const [name, rows] of Object.entries(files)) {
    const uri = `${FileSystem.cacheDirectory}${name}.csv`;
    await FileSystem.writeAsStringAsync(uri, csvFromRows(rows));
    if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(uri);
  }
};

export const exportConsultPdf = async (days: 30 | 60 | 90) => {
  const [profile, metabolism, logs, health, training, substances] = await Promise.all([
    getProfile(),
    getMetabolicEstimate(),
    listDailyLogs(),
    getHealthData(),
    getTrainingSummary(),
    listSubstances()
  ]);

  const html = `
    <html><body style="font-family: Arial; padding: 16px;">
      <h1>Consult coaching (Edu) - Pacote de Consulta (${days} dias)</h1>
      <p><strong>Aviso:</strong> Não é aconselhamento médico. Procure profissional habilitado.</p>
      <h2>Perfil</h2>
      <p>Altura: ${profile?.height_cm ?? '-'} cm | Peso: ${profile?.weight_kg ?? '-'} kg | Atividade: ${profile?.activity_level ?? '-'}</p>
      <h2>Metabolismo</h2>
      <p>Método: ${metabolism?.method ?? '-'} | BMR: ${metabolism?.bmr ?? '-'} | TDEE: ${metabolism?.tdeeRange.low ?? '-'}-${metabolism?.tdeeRange.high ?? '-'}</p>
      <p>Substâncias NÃO entram no cálculo; este app não estima efeitos farmacológicos.</p>
      <h2>Resumo</h2>
      <p>Logs diários: ${logs.length} | Leituras de PA: ${health.bp.length} | Sessões treino: ${training.sessions.length} | Registros de substâncias/medicações: ${substances.length}</p>
      <h2>Perguntas para discutir com o médico</h2>
      <ul><li>Pressão arterial e risco cardiovascular.</li><li>Perfil lipídico.</li><li>Glicemia e HbA1c.</li><li>Função hepática e renal.</li><li>Hemograma e sinais clínicos recentes.</li></ul>
      <p>São tópicos para discutir, não lista obrigatória.</p>
    </body></html>
  `;
  const { uri } = await Print.printToFileAsync({ html });
  if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(uri);
};
