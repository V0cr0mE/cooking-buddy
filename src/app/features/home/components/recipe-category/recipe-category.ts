import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

@Component({
  selector: 'app-recipe-category',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './recipe-category.html',
  styleUrls: ['./recipe-category.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeCategoryComponent {
  @Input({ required: true }) category!: Category;
  @Output() selectCategory = new EventEmitter<string>();

  onClick(): void {
    this.selectCategory.emit(this.category.strCategory);
  }
}
