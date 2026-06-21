import {Component, ElementRef, inject, input, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'app-signature-view',
  templateUrl: 'signature-view.component.html',
  styleUrl: 'signature-view.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class SignatureViewComponent {
  readonly signature = input<string>();

  private _elementRef = inject(ElementRef);
  public nativeElement: HTMLElement;

  constructor() {
    this.nativeElement = this._elementRef.nativeElement;
  }

}
