import { provideZonelessChangeDetection } from '@angular/core';

// Providers applied to the Angular TestBed for unit tests (zoneless).
export default [
  provideZonelessChangeDetection(),
];
