import {AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SignaturePadComponent} from 'angular-signature-pad';
import {NgSignaturePadOptions} from "projects/angular-signature-pad/src/lib/angular-signature-pad.component";


@Component({
  selector: 'app-signature-view',
  templateUrl: 'signature-view.component.html',
  styleUrl: 'signature-view.component.scss'
})
export class SignatureViewComponent {
  @Input() signature: string;

  public nativeElement: HTMLElement;

  constructor(private _elementRef: ElementRef) {
    this.nativeElement = this._elementRef.nativeElement;
  }

}
