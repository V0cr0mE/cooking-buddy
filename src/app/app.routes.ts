import { Routes } from '@angular/router';
import { HomePage } from './features/home/home-page/home-page';
import { RegisterPage } from './features/register/register-page/register-page';
import { RecipePage } from './features/recipe/recipe-page/recipe-page';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [authGuard],
  },
  {
    path: 'recipe/:id',
    component: RecipePage,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RegisterPage,
  },
];
