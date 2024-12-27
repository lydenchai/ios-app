import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './components/home/components/home/home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage,
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomePageModule),
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      canceledNavigationResolution: 'computed',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
