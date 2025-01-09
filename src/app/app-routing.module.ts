import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'categories',
        pathMatch: 'full',
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./routes/category/category.module').then(
            (m) => m.CategoryPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./routes/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: 'notification',
        loadChildren: () =>
          import('./routes/notification/notification.module').then(
            (m) => m.NotificationPageModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./routes/category/category.module').then(
        (m) => m.CategoryPageModule
      ),
  },
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
