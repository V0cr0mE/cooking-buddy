// src/app/shared/services/recipes.service.ts

import { Injectable, signal, Resource, resource } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

//
// 1. Interfaces pour typer les réponses de l’API TheMealDB
//

/**
 * Représente une catégorie telle que renvoyée par 
 * https://www.themealdb.com/api/json/v1/1/categories.php 
 */
export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

/**
 * Représente la version “summary” d’une recette telle que renvoyée par 
 * https://www.themealdb.com/api/json/v1/1/filter.php?c={CATEGORY_NAME}
 */
export interface RecipeSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  //
  // 2.1. Signal qui contiendra la liste des catégories
  //    — initialisé à tableau vide, sera mis à jour après appel HTTP.
  //
  public readonly categories = signal<Category[]>([]);
  public readonly categoriesselected = signal<string | null>(null);

  //
  // 2.2. Resource pour récupérer les recettes d’une catégorie donnée.
  //      On passe en générique <string, RecipeSummary[]> :
  //      • la clé d’entrée est le nom (string) de la catégorie,
  //      • la valeur renvoyée est un tableau de RecipeSummary.
  //
  public readonly recipesResource =
    resource({
      // Define a reactive computation.
      // The params value recomputes whenever any read signals change.
      params: () => ({ category: this.categoriesselected() }),
      // Define an async loader that retrieves data.
      // The resource calls this function every time the `params` value changes.
      loader: ({ params }) =>   firstValueFrom(this.http.get<RecipeSummary[]>(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`))
    });

  constructor(private readonly http: HttpClient) {
    // On charge immédiatement les catégories au moment de l’instanciation du service
    this.loadCategories();
  }

  /**
   * 2.3. Méthode privée pour appeler l’API TheMealDB et alimenter le Signal `categories`.
   *       Endpoint utilisé : https://www.themealdb.com/api/json/v1/1/categories.php
   */
  private loadCategories(): void {
    this.http
      .get<{ categories: Category[] }>(
        'https://www.themealdb.com/api/json/v1/1/categories.php'
      )
      .pipe(
        // On ne conserve que le tableau `categories` du JSON renvoyé
        map(response => response.categories)
      )
      .subscribe({
        next: (cats: Category[]) => {
          // On met à jour le signal avec la liste retournée
          this.categories.set(cats);
        },
        error: (err) => {
          console.error('Erreur en chargeant les catégories :', err);
          // Vous pouvez, si vous le souhaitez, setter un Signal d'erreur ou laisser la liste vide
        }
      });
  }

  setCurrentCategory(categoryName: string | null): void {
    this.categoriesselected.set(categoryName);
  }
}
