import { getDb } from '@/db/client';
import { ActivityLevel, calcKatchMcArdle, calcMifflinStJeor, calcTdeeRange } from '@/utils/calculators';

export type Profile = {
  id?: number;
  heightCm: number;
  weightKg: number;
  age?: number;
  sex?: 'masculino' | 'feminino';
  bodyFat?: number;
  activityLevel: ActivityLevel;
  trainingDays: number;
  goal: string;
  restingHr?: number;
  waistCm?: number;
  baselineBp?: string;
  onboardingDone?: boolean;
  acceptedDisclaimer?: boolean;
  over18?: boolean;
  dataConsent?: boolean;
  nonPrescribedFlag?: boolean;
};

export const saveProfile = async (profile: Profile) => {
  const db = await getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO profile (
      id,height_cm,weight_kg,age,sex,body_fat,activity_level,training_days,goal,resting_hr,waist_cm,
      baseline_bp,onboarding_done,accepted_disclaimer,over_18,data_consent,non_prescribed_flag,updated_at
      ) VALUES (1,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    profile.heightCm,
    profile.weightKg,
    profile.age ?? null,
    profile.sex ?? null,
    profile.bodyFat ?? null,
    profile.activityLevel,
    profile.trainingDays,
    profile.goal,
    profile.restingHr ?? null,
    profile.waistCm ?? null,
    profile.baselineBp ?? null,
    profile.onboardingDone ? 1 : 0,
    profile.acceptedDisclaimer ? 1 : 0,
    profile.over18 ? 1 : 0,
    profile.dataConsent ? 1 : 0,
    profile.nonPrescribedFlag ? 1 : 0,
    new Date().toISOString()
  );
};

export const getProfile = async () => {
  const db = await getDb();
  return db.getFirstAsync<any>('SELECT * FROM profile WHERE id = 1');
};

export const getMetabolicEstimate = async () => {
  const profile = await getProfile();
  if (!profile) return null;
  const mifflin = profile.age
    ? calcMifflinStJeor({
        age: profile.age,
        heightCm: profile.height_cm,
        weightKg: profile.weight_kg,
        sex: profile.sex
      })
    : null;
  const katch = profile.body_fat ? calcKatchMcArdle(profile.weight_kg, profile.body_fat) : null;
  const baseBmr = katch || mifflin;
  if (!baseBmr) return null;

  return {
    bmr: baseBmr,
    method: katch ? 'Katch-McArdle' : 'Mifflin-St Jeor',
    tdeeRange: calcTdeeRange(baseBmr, profile.activity_level as ActivityLevel)
  };
};
