import { Component, ElementRef } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  title: string = 'iOS App';
  isLoading: boolean = false;
  loadingTimeout?: any;

  constructor(
    private languageService: LanguageService, 
    private element: ElementRef,
    private router: Router,
    public loadingService: LoadingService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.forceStop();
        this.loadingService.setLoading(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        // scroll to top on navigate finish 
        setTimeout(() => {
          this.loadingService.setLoading(false);
        }, 100); // fix show table result not found before load data
      }
    });

    // delay to hide some quick loading
    this.loadingService.isLoading$.subscribe((isLoading) => {
      if (isLoading) {
        (element.nativeElement as HTMLElement).classList.add('app-is-loading');
      } else {
        (element.nativeElement as HTMLElement).classList.remove(
          'app-is-loading'
        );
      }
      if (this.loadingTimeout) {
        clearTimeout(this.loadingTimeout);
      }
      this.loadingTimeout = setTimeout(() => {
        this.isLoading = isLoading;
        this.loadingTimeout = undefined;
      }, 200);
    });
  }
}
