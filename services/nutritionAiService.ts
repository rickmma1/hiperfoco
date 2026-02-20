export type MacroProfile = {
  food: string;
  portionGrams: number;
  protein: number;
  carbs: number;
  fats: number;
  kcal: number;
};

const foodBase: MacroProfile[] = [
  { food: 'arroz branco cozido', portionGrams: 100, protein: 2.6, carbs: 28, fats: 0.3, kcal: 130 },
  { food: 'batata inglesa cozida', portionGrams: 100, protein: 2, carbs: 20, fats: 0.1, kcal: 86 },
  { food: 'batata-doce cozida', portionGrams: 100, protein: 1.6, carbs: 20, fats: 0.1, kcal: 86 },
  { food: 'macarrão cozido', portionGrams: 100, protein: 5, carbs: 31, fats: 1.1, kcal: 157 },
  { food: 'frango grelhado', portionGrams: 100, protein: 31, carbs: 0, fats: 3.6, kcal: 165 },
  { food: 'patinho moído magro', portionGrams: 100, protein: 26, carbs: 0, fats: 10, kcal: 202 },
  { food: 'tofu firme', portionGrams: 100, protein: 8, carbs: 2, fats: 5, kcal: 76 },
  { food: 'ovo inteiro', portionGrams: 50, protein: 6.3, carbs: 0.3, fats: 5.3, kcal: 72 },
  { food: 'iogurte natural', portionGrams: 170, protein: 9, carbs: 12, fats: 4, kcal: 120 },
  { food: 'feijão cozido', portionGrams: 100, protein: 9, carbs: 14, fats: 0.5, kcal: 127 },
  { food: 'aveia', portionGrams: 40, protein: 6.8, carbs: 26.5, fats: 2.8, kcal: 156 }
];

const normalize = (v: string) => v.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

const scoreSimilarity = (query: string, candidate: string) => {
  const q = normalize(query);
  const c = normalize(candidate);
  if (c.includes(q)) return 1;
  const intersection = q.split(' ').filter((token) => token.length > 2 && c.includes(token)).length;
  return intersection / Math.max(1, q.split(' ').length);
};

const round1 = (n: number) => Math.round(n * 10) / 10;

export const findFoodByName = (name: string) => {
  const ranked = [...foodBase]
    .map((item) => ({ item, score: scoreSimilarity(name, item.food) }))
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.score > 0 ? ranked[0].item : null;
};

export const suggestSubstitutions = (foodName: string) => {
  const base = findFoodByName(foodName);
  if (!base) {
    return {
      base: null,
      suggestions: []
    };
  }

  const suggestions = foodBase
    .filter((f) => f.food !== base.food)
    .map((candidate) => {
      const factor = base.kcal / Math.max(1, candidate.kcal);
      return {
        food: candidate.food,
        suggestedGrams: round1(candidate.portionGrams * factor),
        macrosEstimated: {
          protein: round1(candidate.protein * factor),
          carbs: round1(candidate.carbs * factor),
          fats: round1(candidate.fats * factor),
          kcal: round1(candidate.kcal * factor)
        },
        note:
          'Estimativa educacional por proporcionalidade calórica/macros. Valide com nutricionista/médico; não substitui plano individual.'
      };
    })
    .sort((a, b) => Math.abs(a.macrosEstimated.kcal - base.kcal) - Math.abs(b.macrosEstimated.kcal - base.kcal))
    .slice(0, 4);

  return { base, suggestions };
};
