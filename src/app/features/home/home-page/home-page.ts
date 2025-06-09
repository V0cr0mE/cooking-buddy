import { Component, effect, inject, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../../../shared/layouts/page-layout/page-layout.component';
import { RecipeCardComponent } from '../components/recipe-card/recipe-card';
import { RecipeCategoriesComponent } from '../components/recipe-categories/recipe-categories';
import { RecipesService } from '../../../core/services/recipes.service';
import { DetailedRecipeCardComponent } from '../components/DetailedRecipeCard/DetailedRecipeCard';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    PageLayoutComponent,
    RecipeCardComponent,
    RecipeCategoriesComponent,
    DetailedRecipeCardComponent
  ],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  private readonly recipesService = inject(RecipesService);

  // bindé à l’input
  searchTerm = signal('');
  searchResults = this.recipesService.searchResults;

  // catégories & cards existants
  categories = this.recipesService.categories;
  selectedCategory = this.recipesService.categoriesselected;
  recipes$ = this.recipesService.recipesResource;

  constructor() {
    effect(() => {
      console.log('categories', this.categories());
      console.log('searchResults', this.searchResults());
    });
  }

  onSearch(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const term = inputEl?.value?.trim() ?? '';
    this.searchTerm.set(term);
    this.recipesService.searchRecipes(term);
  }

  onCategorySelected(category: string): void {
    this.recipesService.setCurrentCategory(category);
  }
}