import { getDb } from '@/db/client';

export const addDailyLog = async (input: any) => {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO daily_logs (date,weight_kg,waist_cm,steps,sleep_hours,rpe,mood,notes,photo_uri)
     VALUES (?,?,?,?,?,?,?,?,?)`,
    input.date,
    input.weightKg ?? null,
    input.waistCm ?? null,
    input.steps ?? null,
    input.sleepHours ?? null,
    input.rpe ?? null,
    input.mood ?? null,
    input.notes ?? null,
    input.photoUri ?? null
  );
};

export const listDailyLogs = async () => {
  const db = await getDb();
  return db.getAllAsync<any>('SELECT * FROM daily_logs ORDER BY date DESC');
};
