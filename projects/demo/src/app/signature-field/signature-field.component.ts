import {AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SignaturePadComponent} from 'angular-signature-pad';
import {NgSignaturePadOptions} from "projects/angular-signature-pad/src/lib/angular-signature-pad.component";

export type SignatureFieldConfig = {
  options: NgSignaturePadOptions;
  quality?: number;
  imageType?: string;
};

@Component({
  selector: 'app-signature-field',
  templateUrl: 'signature-field.component.html',
  styleUrl: 'signature-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignatureFieldComponent),
      multi: true,
    },
  ],
})
export class SignatureFieldComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild(SignaturePadComponent) public signaturePad: SignaturePadComponent;

  @Input() options: NgSignaturePadOptions;
  @Input() quality: number;
  @Input() imageType: string;

  public nativeElement: HTMLElement;

  private _signature: string;
  private onChange: (value: string) => void;
  private onTouched: () => void;

  get signature(): string {
    return this._signature;
  }

  set signature(value: any) {
    this._signature = value;
    console.log('Set signature to ', value);
    this.onChange(this.signature);
  }

  constructor(private _elementRef: ElementRef) {
    this.nativeElement = this._elementRef.nativeElement;
  }

  public ngAfterViewInit(): void {
    this.signaturePad.clear();
  }

  public writeValue(value: string): void {
    this._signature = value;
    this._updateSignaturePadData(value);
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public drawBegin(): void {
    console.log('Begin Drawing');
  }

  public drawComplete(data: any): void {
    console.log('Complete Drawing', data);
    if (data) {
      this.signature = this.signaturePad.toDataURL(this.imageType, this.quality);
    } else {
      this.signature = '';
    }
  }

  public clear(): void {
    this.signaturePad.clear();
    this.signature = '';
  }

  private _updateSignaturePadData(value: string) {
    if (this.signaturePad && value) {
      this.signaturePad.fromDataURL(value);
      console.log('Signature data :', this.signaturePad.toData());
    }
  }
}
