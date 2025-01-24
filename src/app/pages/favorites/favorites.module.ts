import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FavoritesPageRoutingModule } from './favorites-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FavoritesPageRoutingModule],
})
export class FavoritesPageModule {}
