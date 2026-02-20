export type ActivityLevel = 'sedentario' | 'leve' | 'moderado' | 'alto' | 'atleta';

export const activityMultiplier: Record<ActivityLevel, number> = {
  sedentario: 1.2,
  leve: 1.375,
  moderado: 1.55,
  alto: 1.725,
  atleta: 1.9
};

export const calcMifflinStJeor = (params: {
  weightKg: number;
  heightCm: number;
  age: number;
  sex?: 'masculino' | 'feminino';
}) => {
  const base = 10 * params.weightKg + 6.25 * params.heightCm - 5 * params.age;
  const sexOffset = params.sex === 'feminino' ? -161 : 5;
  return Math.round(base + sexOffset);
};

export const calcKatchMcArdle = (weightKg: number, bodyFatPercent: number) => {
  const leanMass = weightKg * (1 - bodyFatPercent / 100);
  return Math.round(370 + 21.6 * leanMass);
};

export const calcTdeeRange = (bmr: number, activity: ActivityLevel, uncertainty = 0.08) => {
  const tdee = bmr * activityMultiplier[activity];
  return {
    tdee: Math.round(tdee),
    low: Math.round(tdee * (1 - uncertainty)),
    high: Math.round(tdee * (1 + uncertainty))
  };
};

export const movingAverage = (values: number[], window = 7) => {
  if (window <= 0) return values;
  return values.map((_, idx) => {
    const start = Math.max(0, idx - window + 1);
    const segment = values.slice(start, idx + 1);
    return segment.reduce((sum, current) => sum + current, 0) / segment.length;
  });
};

export const estimateWeeklyVolume = (
  sessions: Array<{ reps: number; series: number; loadKg: number; muscleGroup: string }>
) => {
  return sessions.reduce<Record<string, number>>((acc, item) => {
    const sessionVolume = item.reps * item.series * item.loadKg;
    acc[item.muscleGroup] = (acc[item.muscleGroup] || 0) + sessionVolume;
    return acc;
  }, {});
};
