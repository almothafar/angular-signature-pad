import {Component, ElementRef, inject, Input} from '@angular/core';


@Component({
  selector: 'app-signature-view',
  templateUrl: 'signature-view.component.html',
  styleUrl: 'signature-view.component.scss',
  standalone: true
})
export class SignatureViewComponent {
  @Input() signature: string;

  private _elementRef = inject(ElementRef);
  public nativeElement: HTMLElement;

  constructor() {
    this.nativeElement = this._elementRef.nativeElement;
  }

}
