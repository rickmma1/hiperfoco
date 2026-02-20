import { findFoodByName, suggestSubstitutions } from '@/services/nutritionAiService';

describe('nutritionAiService', () => {
  it('finds a known food by fuzzy name', () => {
    expect(findFoodByName('arroz branco')?.food).toBe('arroz branco cozido');
  });

  it('returns substitutions with proportional macros', () => {
    const result = suggestSubstitutions('arroz branco cozido');
    expect(result.base?.food).toBe('arroz branco cozido');
    expect(result.suggestions.length).toBeGreaterThan(0);
    expect(result.suggestions[0]).toHaveProperty('macrosEstimated');
  });

  it('returns empty suggestions for unknown food', () => {
    const result = suggestSubstitutions('alimento inexistente xyz');
    expect(result.base).toBeNull();
    expect(result.suggestions).toEqual([]);
  });
});
