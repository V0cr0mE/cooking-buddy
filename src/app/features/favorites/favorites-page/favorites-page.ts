import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../../../shared/layouts/page-layout/page-layout.component';
import { FavoritesService } from '../../../core/services/favorites.service';
import { RecipesService, RecipeDetailed } from '../../../core/services/recipes.service';
import { DetailedRecipeCardComponent } from '../../home/components/DetailedRecipeCard/DetailedRecipeCard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent, DetailedRecipeCardComponent, MatProgressSpinnerModule],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.scss'
})
export class FavoritesPage {
  private favoritesService = inject(FavoritesService);
  private recipesService = inject(RecipesService);

  favoriteIds = this.favoritesService.favorites;
  recipes = signal<RecipeDetailed[]>([]);
  loading = signal(false);

  constructor() {
    effect(() => {
      const ids = this.favoriteIds();
      if (!ids.length) {
        this.recipes.set([]);
        return;
      }
      this.loading.set(true);
      Promise.all(ids.map(id => this.recipesService.getRecipeById(id)))
        .then(list => this.recipes.set(list.filter((r): r is RecipeDetailed => !!r)))
        .finally(() => this.loading.set(false));
    });
  }
}
