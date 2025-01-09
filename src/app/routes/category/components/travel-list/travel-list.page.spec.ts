import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelListPage } from './travel-list.page';

describe('TravelListPage', () => {
  let component: TravelListPage;
  let fixture: ComponentFixture<TravelListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
