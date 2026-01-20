import {Component, ElementRef, inject, input} from '@angular/core';


@Component({
  selector: 'app-signature-view',
  templateUrl: 'signature-view.component.html',
  styleUrl: 'signature-view.component.scss',
  standalone: true
})
export class SignatureViewComponent {
  readonly signature = input<string>(undefined);

  private _elementRef = inject(ElementRef);
  public nativeElement: HTMLElement;

  constructor() {
    this.nativeElement = this._elementRef.nativeElement;
  }

}
