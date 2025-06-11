import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PageLayoutComponent } from '../../../shared/layouts/page-layout/page-layout.component';
import { RecipesService, RecipeDetailed } from '../../../core/services/recipes.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent, MatCardModule, MatListModule],
  templateUrl: './recipe-page.html',
  styleUrl: './recipe-page.scss'
})
export class RecipePage {
  private readonly route = inject(ActivatedRoute);
  private readonly recipesService = inject(RecipesService);

  recipeResource = this.recipesService.recipeResource;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.recipesService.setCurrentRecipeId(id);
  }

  getIngredients(recipe: RecipeDetailed | null): string[] {
    if (!recipe) return [];
    const items: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ing = recipe[`strIngredient${i}`]?.trim();
      const qty = recipe[`strMeasure${i}`]?.trim();
      if (ing) items.push(qty ? `${ing} – ${qty}` : ing);
    }
    return items;
  }
}
