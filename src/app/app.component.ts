import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Category', url: '/category', icon: 'grid' },
    { title: 'Favorites', url: '/favorites', icon: 'heart' },
    { title: 'Archived', url: '/archived', icon: 'archive' },
    { title: 'Trash', url: '/trash', icon: 'trash' },
    { title: 'Spam', url: '/spam', icon: 'warning' },
  ];
  isSmallScreen: boolean = false;
  currentRoute: string = 'home';

  constructor(
    private platform: Platform,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects.substring(1);
      }
    });
    this.initializeApp();
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

  initializeApp(): void {
    this.platform.ready().then(() => {
      document.body.classList.remove('dark');
    });
  }
}
