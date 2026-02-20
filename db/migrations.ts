import { SQLiteDatabase } from 'expo-sqlite';
import { migrations } from './schema';

export const runMigrations = async (db: SQLiteDatabase) => {
  await db.execAsync('CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT);');
  const row = await db.getFirstAsync<{ value: string }>("SELECT value FROM meta WHERE key = 'schema_version';");
  const currentVersion = Number(row?.value || 0);

  for (let idx = currentVersion; idx < migrations.length; idx += 1) {
    await db.execAsync('BEGIN');
    try {
      await db.execAsync(migrations[idx]);
      await db.runAsync(
        "INSERT OR REPLACE INTO meta (key, value) VALUES ('schema_version', ?);",
        String(idx + 1)
      );
      await db.execAsync('COMMIT');
    } catch (error) {
      await db.execAsync('ROLLBACK');
      throw error;
    }
  }
};
