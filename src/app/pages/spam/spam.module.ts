import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SpamPageRoutingModule } from './spam-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SpamPageRoutingModule],
})
export class SpamPageModule {}
