import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/components/home-page/home.page').then(
        (p) => p.HomePage
      ),
  },
  {
    path: 'category',
    loadComponent: () =>
      import('./pages/category/components/category-page/category.page').then(
        (p) => p.CategoryPage
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/components/favorites-page/favorites.page').then(
        (p) => p.FavoritesPage
      ),
  },
  {
    path: 'archived',
    loadComponent: () =>
      import('./pages/archived/components/acrhived-page/archived.page').then(
        (p) => p.ArchivedPage
      ),
  },
  {
    path: 'trash',
    loadComponent: () =>
      import('./pages/trash/components/trash-page/trash.page').then(
        (p) => p.TrashPage
      ),
  },
  {
    path: 'spam',
    loadComponent: () =>
      import('./pages/spam/components/spam-page/spam.page').then(
        (p) => p.SpamPage
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
