import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../../../shared/layouts/page-layout/page-layout.component';
import { RecipeCardComponent } from '../components/recipe-card/recipe-card';
import { RecipeCategoriesComponent } from '../components/recipe-categories/recipe-categories';
import { RecipesService } from '../../../core/services/recipes.service';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    PageLayoutComponent,
    RecipeCardComponent,
    RecipeCategoriesComponent,
  ],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss']
})
export class HomePage {
  private readonly recipesService = inject(RecipesService);
  categories = this.recipesService.categories;
  selectedCategory = this.recipesService.categoriesselected;
  recipes$ = this.recipesService.recipesResource;
  onCategorySelected(categoryName: string): void {
    this.recipesService.setCurrentCategory(categoryName);
  }
}
