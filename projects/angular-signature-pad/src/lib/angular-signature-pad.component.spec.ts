import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturePadComponent } from './angular-signature-pad.component';

describe('AngularSignaturePadComponent', () => {
  let component: SignaturePadComponent;
  let fixture: ComponentFixture<SignaturePadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignaturePadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturePadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
