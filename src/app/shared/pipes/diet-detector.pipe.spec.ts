import { DietDetectorPipe } from './diet-detector.pipe';
import { RecipeDetailed } from '../../core/services/recipes.service';

describe('DietDetectorPipe', () => {
  const pipe = new DietDetectorPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('detects classic recipes', () => {
    const recipe = {
      strIngredient1: 'Beef',
      strIngredient2: 'Onion'
    } as RecipeDetailed;
    expect(pipe.transform(recipe)).toBe('Classic');
  });

  it('detects vegetarian recipes', () => {
    const recipe = {
      strIngredient1: 'Egg',
      strIngredient2: 'Milk',
      strIngredient3: 'Flour'
    } as RecipeDetailed;
    expect(pipe.transform(recipe)).toBe('Vegetarian');
  });

  it('detects vegan recipes', () => {
    const recipe = {
      strIngredient1: 'Carrot',
      strIngredient2: 'Potato'
    } as RecipeDetailed;
    expect(pipe.transform(recipe)).toBe('Vegan');
  });
});
