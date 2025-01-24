import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'category',
    loadComponent: () =>
      import('./pages/category/category.page').then((m) => m.CategoryPage),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites.page').then((m) => m.FavoritesPage),
  },
  {
    path: 'archived',
    loadComponent: () =>
      import('./pages/archived/archived.page').then((m) => m.ArchivedPage),
  },
  {
    path: 'trash',
    loadComponent: () =>
      import('./pages/trash/trash.page').then((m) => m.TrashPage),
  },
  {
    path: 'spam',
    loadComponent: () =>
      import('./pages/spam/spam.page').then((m) => m.SpamPage),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'category',
    loadChildren: () =>
      import('./pages/category/category.module').then(
        (m) => m.CategoryPageModule
      ),
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./pages/favorites/favorites.module').then(
        (m) => m.FavoritesPageModule
      ),
  },
  {
    path: 'archived',
    loadChildren: () =>
      import('./pages/archived/archived.module').then(
        (m) => m.ArchivedPageModule
      ),
  },
  {
    path: 'trash',
    loadChildren: () =>
      import('./pages/trash/trash.module').then((m) => m.TrashPageModule),
  },
  {
    path: 'spam',
    loadChildren: () =>
      import('./pages/spam/spam.module').then((m) => m.SpamPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
