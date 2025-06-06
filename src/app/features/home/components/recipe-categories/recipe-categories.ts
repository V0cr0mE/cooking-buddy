import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

import { RecipeCategoryComponent, Category } from '../recipe-category/recipe-category';
import { RecipeCardComponent, RecipeSummary } from '../recipe-card/recipe-card';
import { RecipesService } from '../../../../core/services/recipes.service';
import { effect } from '@angular/core';

@Component({
  selector: 'app-recipe-categories',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    RecipeCategoryComponent,
    RecipeCardComponent
  ],
  templateUrl: './recipe-categories.html',
  styleUrls: ['./recipe-categories.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeCategoriesComponent {

  private readonly recipesService = inject(RecipesService);
  categories = this.recipesService.categories;
  selectedCategory = this.recipesService.categoriesselected;
  recipes$ = this.recipesService.recipesResource;


  onCategorySelected(categoryName: string): void {
    this.recipesService.setCurrentCategory(categoryName);
  }
}
