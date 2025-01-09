import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryPage } from './components/category-page/category.page';
import { TravelListPage } from './components/travel-list/travel-list.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryPage,
    children: [],
  },
  {
    path: 'travel-list',
    component: TravelListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryPageRoutingModule {}
