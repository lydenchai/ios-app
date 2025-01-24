import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Category', url: '/category', icon: 'grid' },
    { title: 'Favorites', url: '/favorites', icon: 'heart' },
    { title: 'Archived', url: '/archived', icon: 'archive' },
    { title: 'Trash', url: '/trash', icon: 'trash' },
    { title: 'Spam', url: '/spam', icon: 'warning' },
  ];

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      // Disable dark mode detection
      document.body.classList.remove('dark');
    });
  }
}
