import {Component, ElementRef, Input} from '@angular/core';


@Component({
  selector: 'app-signature-view',
  templateUrl: 'signature-view.component.html',
  styleUrl: 'signature-view.component.scss',
  standalone: true
})
export class SignatureViewComponent {
  @Input() signature: string;

  public nativeElement: HTMLElement;

  constructor(private _elementRef: ElementRef) {
    this.nativeElement = this._elementRef.nativeElement;
  }

}
