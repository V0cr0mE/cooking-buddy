import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PageLayoutComponent } from '../../../shared/layouts/page-layout/page-layout.component';
import { RecipesService, RecipeDetailed } from '../../../core/services/recipes.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YtHoverPlayDirective } from '../../../shared/directives/yt-hover-play.directive';
import { DietDetectorPipe } from '../../../shared/pipes/diet-detector.pipe';

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [
    CommonModule,
    PageLayoutComponent,
    MatCardModule,
    MatListModule,
    YtHoverPlayDirective,
    DietDetectorPipe
  ],
  templateUrl: './recipe-page.html',
  styleUrl: './recipe-page.scss'
})
export class RecipePage {
  private readonly route = inject(ActivatedRoute);
  private readonly recipesService = inject(RecipesService);
  private readonly sanitizer = inject(DomSanitizer);

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

  getYoutubeUrl(recipe: RecipeDetailed | null): SafeResourceUrl | null {
    if (!recipe || !recipe['strYoutube']) return null;
    try {
      const url = new URL(recipe['strYoutube']);
      const id = url.searchParams.get('v');
      if (!id) return null;
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${id}?enablejsapi=1`
      );
    } catch {
      return null;
    }
  }
}
