import { Component, Input, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RecipeDetailed } from '../../../../core/services/recipes.service';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../../../../core/services/favorites.service';

@Component({
    selector: 'app-detailed-recipe-card',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule, RouterModule],
    templateUrl: './DetailedRecipeCard.html',
    styleUrls: ['./DetailedRecipeCard.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedRecipeCardComponent {
    @Input({ required: true }) recipe!: RecipeDetailed;

    private favoritesService = inject(FavoritesService);

    /** Signal indiquant si la recette est dans les favoris */
    isFavorite = computed(() =>
        this.favoritesService.isFavorite(this.recipe.idMeal)
    );

    toggleFavorite(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.favoritesService.toggle(this.recipe.idMeal);
    }

    /** Extrait ingrédients + mesures */
    getIngredients(): string[] {
        const items: string[] = [];
        for (let i = 1; i <= 20; i++) {
            const ing = this.recipe[`strIngredient${i}`]?.trim();
            const qty = this.recipe[`strMeasure${i}`]?.trim();
            if (ing) {
                items.push(qty ? `${ing} – ${qty}` : ing);
            }
        }
        return items;
    }
}