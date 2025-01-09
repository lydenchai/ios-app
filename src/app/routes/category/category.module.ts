import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-routing.module';
import { CategoryPage } from './components/category-page/category.page';
import { TravelListPage } from './components/travel-list/travel-list.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CategoryPageRoutingModule],
  declarations: [CategoryPage, TravelListPage],
})
export class CategoryPageModule {}
