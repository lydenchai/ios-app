import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonHeader, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.page.html',
  styleUrls: ['./trash.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class TrashPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
