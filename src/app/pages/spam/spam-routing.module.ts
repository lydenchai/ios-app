import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpamPage } from './components/spam-page/spam.page';

const routes: Routes = [
  {
    path: '',
    component: SpamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpamPageRoutingModule {}
