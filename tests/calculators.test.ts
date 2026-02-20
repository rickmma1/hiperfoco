import {
  calcKatchMcArdle,
  calcMifflinStJeor,
  calcTdeeRange,
  estimateWeeklyVolume,
  movingAverage
} from '@/utils/calculators';

describe('calculators', () => {
  it('calcMifflinStJeor', () => {
    expect(calcMifflinStJeor({ weightKg: 80, heightCm: 180, age: 30, sex: 'masculino' })).toBe(1780);
  });

  it('calcKatchMcArdle', () => {
    expect(calcKatchMcArdle(80, 20)).toBe(1752);
  });

  it('calcTdeeRange', () => {
    expect(calcTdeeRange(1800, 'moderado')).toEqual({ tdee: 2790, low: 2567, high: 3013 });
  });

  it('movingAverage', () => {
    expect(movingAverage([1, 2, 3, 4], 2)).toEqual([1, 1.5, 2.5, 3.5]);
  });

  it('estimateWeeklyVolume', () => {
    expect(
      estimateWeeklyVolume([
        { reps: 10, series: 3, loadKg: 50, muscleGroup: 'peito' },
        { reps: 8, series: 4, loadKg: 60, muscleGroup: 'peito' }
      ])
    ).toEqual({ peito: 3420 });
  });
});
