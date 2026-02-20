export const migrations = [
  `CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY NOT NULL,
    height_cm REAL NOT NULL,
    weight_kg REAL NOT NULL,
    age INTEGER,
    sex TEXT,
    body_fat REAL,
    activity_level TEXT NOT NULL,
    training_days INTEGER NOT NULL,
    goal TEXT NOT NULL,
    resting_hr INTEGER,
    waist_cm REAL,
    baseline_bp TEXT,
    onboarding_done INTEGER DEFAULT 0,
    accepted_disclaimer INTEGER DEFAULT 0,
    over_18 INTEGER DEFAULT 0,
    data_consent INTEGER DEFAULT 0,
    non_prescribed_flag INTEGER DEFAULT 0,
    updated_at TEXT NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS daily_logs (
    id INTEGER PRIMARY KEY NOT NULL,
    date TEXT NOT NULL,
    weight_kg REAL,
    waist_cm REAL,
    steps INTEGER,
    sleep_hours REAL,
    rpe INTEGER,
    mood TEXT,
    notes TEXT,
    photo_uri TEXT
  );`,
  `CREATE TABLE IF NOT EXISTS bp_readings (
    id INTEGER PRIMARY KEY NOT NULL,
    measured_at TEXT NOT NULL,
    systolic INTEGER NOT NULL,
    diastolic INTEGER NOT NULL,
    context TEXT,
    notes TEXT
  );`,
  `CREATE TABLE IF NOT EXISTS training_sessions (
    id INTEGER PRIMARY KEY NOT NULL,
    date TEXT NOT NULL,
    duration_min INTEGER NOT NULL,
    focus TEXT,
    notes TEXT,
    template_name TEXT
  );`,
  `CREATE TABLE IF NOT EXISTS training_exercises (
    id INTEGER PRIMARY KEY NOT NULL,
    session_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    sets INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    load_kg REAL NOT NULL,
    rpe INTEGER,
    muscle_group TEXT,
    FOREIGN KEY(session_id) REFERENCES training_sessions(id) ON DELETE CASCADE
  );`,
  `CREATE TABLE IF NOT EXISTS substance_logs (
    id INTEGER PRIMARY KEY NOT NULL,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT,
    route TEXT,
    prescribed INTEGER NOT NULL,
    dose_frequency TEXT,
    notes TEXT
  );`,
  `CREATE TABLE IF NOT EXISTS symptom_checks (
    id INTEGER PRIMARY KEY NOT NULL,
    checked_at TEXT NOT NULL,
    chest_pain INTEGER DEFAULT 0,
    shortness_breath INTEGER DEFAULT 0,
    fainting INTEGER DEFAULT 0,
    intense_palpitations INTEGER DEFAULT 0,
    severe_abdominal_pain INTEGER DEFAULT 0,
    persistent_vomiting INTEGER DEFAULT 0,
    jaundice_signs INTEGER DEFAULT 0,
    severe_headache_vision INTEGER DEFAULT 0,
    major_swelling_leg_pain INTEGER DEFAULT 0,
    severe_mood_change INTEGER DEFAULT 0,
    hypoglycemia_signs INTEGER DEFAULT 0,
    severe_skin_infection INTEGER DEFAULT 0,
    notes TEXT
  );`
];
