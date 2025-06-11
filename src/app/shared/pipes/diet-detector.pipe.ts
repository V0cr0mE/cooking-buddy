import { Pipe, PipeTransform } from '@angular/core';
import { RecipeDetailed } from '../../core/services/recipes.service';

@Pipe({
  name: 'dietDetector',
  standalone: true
})
export class DietDetectorPipe implements PipeTransform {
  transform(recipe: RecipeDetailed | null): string {
    if (!recipe) return '';

    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ing = recipe[`strIngredient${i}`];
      if (typeof ing === 'string' && ing.trim()) {
        ingredients.push(ing.trim().toLowerCase());
      }
    }

    const meatKeywords = [
      'beef', 'pork', 'chicken', 'turkey', 'lamb', 'mutton', 'bacon',
      'ham', 'duck', 'meat', 'anchovy', 'anchovies', 'fish', 'tuna',
      'salmon', 'shrimp', 'prawn', 'crab', 'lobster'
    ];
    const nonVeganKeywords = [
      'egg', 'eggs', 'milk', 'cheese', 'butter', 'cream', 'yogurt',
      'yoghurt', 'honey'
    ];

    const hasMeat = ingredients.some(ing =>
      meatKeywords.some(k => ing.includes(k))
    );

    if (hasMeat) return 'Classic';

    const hasNonVegan = ingredients.some(ing =>
      nonVeganKeywords.some(k => ing.includes(k))
    );

    if (hasNonVegan) return 'Vegetarian';

    return 'Vegan';
  }
}
