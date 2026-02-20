import * as SQLite from 'expo-sqlite';
import { runMigrations } from './migrations';

let db: SQLite.SQLiteDatabase | null = null;

export const getDb = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('consult_coaching_edu.db');
    await db.execAsync('PRAGMA journal_mode = WAL;');
    await runMigrations(db);
  }
  return db;
};
