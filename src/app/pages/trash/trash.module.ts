import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TrashPageRoutingModule } from './trash-routing.module';
import { TrashPage } from './components/trash-page/trash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrashPageRoutingModule,
    TrashPage,
  ],
})
export class TrashPageModule {}
