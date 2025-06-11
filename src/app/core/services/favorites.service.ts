import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly STORAGE_KEY = 'favorite_recipes';

  private _favorites = signal<string[]>(this.loadFromStorage());
  /** Liste des identifiants de recettes favoris */
  favorites = this._favorites;

  private loadFromStorage(): string[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._favorites()));
  }

  add(id: string): void {
    if (!this._favorites().includes(id)) {
      this._favorites.set([...this._favorites(), id]);
      this.saveToStorage();
    }
  }

  remove(id: string): void {
    if (this._favorites().includes(id)) {
      this._favorites.set(this._favorites().filter(f => f !== id));
      this.saveToStorage();
    }
  }

  toggle(id: string): void {
    if (this.isFavorite(id)) {
      this.remove(id);
    } else {
      this.add(id);
    }
  }

  isFavorite(id: string): boolean {
    return this._favorites().includes(id);
  }
}
