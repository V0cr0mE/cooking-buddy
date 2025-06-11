import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../../../../core/services/favorites.service';

export interface RecipeSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './recipe-card.html',
  styleUrls: ['./recipe-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeCardComponent {
  @Input({ required: true }) recipe!: RecipeSummary;

  private favoritesService = inject(FavoritesService);

  isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.recipe.idMeal);
  }

  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoritesService.toggle(this.recipe.idMeal);
  }
}
