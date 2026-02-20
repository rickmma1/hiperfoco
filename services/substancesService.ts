import { getDb } from '@/db/client';

export const addSubstance = async (row: any) => {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO substance_logs (category,name,start_date,end_date,route,prescribed,dose_frequency,notes)
     VALUES (?,?,?,?,?,?,?,?)`,
    row.category,
    row.name,
    row.startDate,
    row.endDate ?? null,
    row.route ?? null,
    row.prescribed ? 1 : 0,
    row.doseFrequency ?? null,
    row.notes ?? null
  );
};

export const listSubstances = async () => {
  const db = await getDb();
  return db.getAllAsync<any>('SELECT * FROM substance_logs ORDER BY start_date DESC');
};
