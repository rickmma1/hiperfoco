import { getDb } from '@/db/client';

export const addTrainingSession = async (session: any, exercises: any[]) => {
  const db = await getDb();
  const result = await db.runAsync(
    `INSERT INTO training_sessions (date,duration_min,focus,notes,template_name) VALUES (?,?,?,?,?)`,
    session.date,
    session.durationMin,
    session.focus,
    session.notes ?? null,
    session.templateName ?? null
  );

  for (const ex of exercises) {
    await db.runAsync(
      `INSERT INTO training_exercises (session_id,name,sets,reps,load_kg,rpe,muscle_group) VALUES (?,?,?,?,?,?,?)`,
      result.lastInsertRowId,
      ex.name,
      ex.sets,
      ex.reps,
      ex.loadKg,
      ex.rpe ?? null,
      ex.muscleGroup ?? null
    );
  }
};

export const getTrainingSummary = async () => {
  const db = await getDb();
  const sessions = await db.getAllAsync<any>('SELECT * FROM training_sessions ORDER BY date DESC');
  const exercises = await db.getAllAsync<any>('SELECT * FROM training_exercises');
  return { sessions, exercises };
};
