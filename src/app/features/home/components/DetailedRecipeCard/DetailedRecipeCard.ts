import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RecipeDetailed } from '../../../../core/services/recipes.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-detailed-recipe-card',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatListModule, RouterModule],
    templateUrl: './DetailedRecipeCard.html',
    styleUrls: ['./DetailedRecipeCard.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedRecipeCardComponent {
    @Input({ required: true }) recipe!: RecipeDetailed;

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