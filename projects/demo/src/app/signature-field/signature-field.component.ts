import {AfterViewInit, Component, ElementRef, forwardRef, inject, input, output, viewChild} from '@angular/core';
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
  standalone: true,
  imports: [SignaturePadComponent]
})
export class SignatureFieldComponent implements ControlValueAccessor, AfterViewInit {
  public readonly signaturePad = viewChild.required(SignaturePadComponent);

  readonly options = input<NgSignaturePadOptions>(undefined);
  readonly quality = input<number>(undefined);
  readonly imageType = input<string>(undefined);

  public readonly signatureChanged = output<string>();

  private _elementRef = inject(ElementRef);
  public nativeElement: HTMLElement;

  private _signature: string;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get signature(): string {
    return this._signature;
  }

  set signature(value: any) {
    this._signature = value;
    console.log('Set signature to ', value);
    this.signatureChanged.emit(value);
    this.onChange(this.signature);
  }

  constructor() {
    this.nativeElement = this._elementRef.nativeElement;
  }

  public ngAfterViewInit(): void {
    this.signaturePad().clear();
  }

  public randomBackgroundColor() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);

    this.signaturePad().changeBackgroundColor(`rgb(${r},${g},${b})`);
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
    this.signature = this.signaturePad().toDataURL(this.imageType(), this.quality());
  }

  public drawCleared(): void {
    this.signature = '';
  }

  public clear(): void {
    this.signaturePad().clear();
    this.signature = '';
  }

  private _updateSignaturePadData(value: string) {
    const signaturePad = this.signaturePad();
    if (signaturePad && value) {
      signaturePad.fromDataURL(value);
      console.log('Signature data :', signaturePad.toData());
    }
  }
}
