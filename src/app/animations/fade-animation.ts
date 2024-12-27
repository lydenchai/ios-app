import { trigger, transition, style, animate } from '@angular/animations';

export const fadeAnimation = trigger('fade', [
  transition(':enter', [
    style({ height: 0, opacity: 0, minHeight: 0 }),
    animate('150ms', style({ height: '*', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('150ms', style({ height: 0, opacity: 0, minHeight: 0 })),
  ]),
]);
