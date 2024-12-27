import { animate, style, transition, trigger } from '@angular/animations';

export const error = trigger('error', [
  transition(':enter', [
    style({ height: 0, opacity: 0 }),
    animate('150ms ease-in', style({ height: '*', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('150ms ease-out', style({ height: 0, opacity: 0 })),
  ]),
]);
