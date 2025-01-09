import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
  standalone: false,
})
export class CategoryPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
