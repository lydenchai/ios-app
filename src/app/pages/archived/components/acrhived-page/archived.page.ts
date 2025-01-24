import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.page.html',
  styleUrls: ['./archived.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ArchivedPage implements OnInit {
isSmallScreen: boolean = false;
  
    constructor(private breakpointObserver: BreakpointObserver) {}
  
    ngOnInit(): void {
      this.breakpointObserver
        .observe([Breakpoints.Small, Breakpoints.XSmall])
        .subscribe((result) => {
          this.isSmallScreen = result.matches;
        });
    }
}
