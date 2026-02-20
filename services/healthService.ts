import { getDb } from '@/db/client';

export const addBpReading = async (row: any) => {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO bp_readings (measured_at,systolic,diastolic,context,notes) VALUES (?,?,?,?,?)`,
    row.measuredAt,
    row.systolic,
    row.diastolic,
    row.context,
    row.notes ?? null
  );
};

export const addSymptomCheck = async (row: any) => {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO symptom_checks (
      checked_at,chest_pain,shortness_breath,fainting,intense_palpitations,severe_abdominal_pain,persistent_vomiting,
      jaundice_signs,severe_headache_vision,major_swelling_leg_pain,severe_mood_change,hypoglycemia_signs,severe_skin_infection,notes
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    row.checkedAt,
    row.chestPain ? 1 : 0,
    row.shortnessBreath ? 1 : 0,
    row.fainting ? 1 : 0,
    row.intensePalpitations ? 1 : 0,
    row.severeAbdominalPain ? 1 : 0,
    row.persistentVomiting ? 1 : 0,
    row.jaundiceSigns ? 1 : 0,
    row.severeHeadacheVision ? 1 : 0,
    row.majorSwellingLegPain ? 1 : 0,
    row.severeMoodChange ? 1 : 0,
    row.hypoglycemiaSigns ? 1 : 0,
    row.severeSkinInfection ? 1 : 0,
    row.notes ?? null
  );
};

export const triageLevel = (row: any): 'VERDE' | 'AMARELO' | 'VERMELHO' => {
  const redFlags = ['chestPain', 'shortnessBreath', 'fainting', 'jaundiceSigns', 'severeHeadacheVision'];
  if (redFlags.some((key) => row[key])) return 'VERMELHO';
  const yellowFlags = ['persistentVomiting', 'intensePalpitations', 'severeMoodChange', 'majorSwellingLegPain'];
  if (yellowFlags.some((key) => row[key])) return 'AMARELO';
  return 'VERDE';
};

export const getHealthData = async () => {
  const db = await getDb();
  const bp = await db.getAllAsync<any>('SELECT * FROM bp_readings ORDER BY measured_at DESC');
  const symptoms = await db.getAllAsync<any>('SELECT * FROM symptom_checks ORDER BY checked_at DESC');
  return { bp, symptoms };
};
