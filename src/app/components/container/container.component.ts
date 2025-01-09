import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  standalone: false,
})
export class ContainerComponent implements OnInit {
  dynamicTitle: string = 'Categories';

  constructor() {}

  ngOnInit(): void {}

  onTabChange(event: any) {
    const selectedTab = event.tab;
    switch (selectedTab) {
      case 'categories':
        this.dynamicTitle = 'Categories';
        break;
      case 'profile':
        this.dynamicTitle = 'Profile';
        break;
      case 'notification':
        this.dynamicTitle = 'Notifications';
        break;
      default:
        this.dynamicTitle = 'Menu';
        break;
    }
  }
}
