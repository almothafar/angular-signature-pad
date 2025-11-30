import {Component, ElementRef, inject, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SignatureFieldComponent, SignatureFieldConfig} from './signature-field/signature-field.component';
import {SignatureViewComponent} from './signature-view/signature-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, SignatureFieldComponent, SignatureViewComponent]
})
export class AppComponent {
  public items: SignatureFieldConfig[] = [
    {
      options: {backgroundColor: 'rgb(255,255,255)', canvasWidth: 300, canvasHeight: 150},
    },
    {
      options: {canvasBackground: 'rgb(255, 255, 255) url(assets/sign-here.png) bottom left no-repeat', penColor: 'rgb(255, 0, 0)', canvasWidth: 300, canvasHeight: 150},
      quality: 0.5,
      imageType: 'image/jpeg',
    },
    {
      options: {canvasBackground: 'rgb(0, 0, 255) url(assets/sign-here.png) bottom left no-repeat', penColor: 'rgb(255, 255, 0)', canvasWidth: 300, canvasHeight: 150},
      quality: 0.8,
      imageType: 'image/jpeg',
    },
    {
      options: {canvasBackground: 'url(assets/sign-here.png) bottom left no-repeat, center / cover url(assets/cat-sig.png)', canvasWidth: 400, canvasHeight: 400}
    }
  ];
  public titles: string[] = [
    'Default with white background',
    'Image Background & Red Pen Color (JPEG/Quality 50%)',
    'Image with Blue Background & Red Pen Color (JPEG/Quality 80%)',
    'With image as background'
  ];

  private fb = inject(FormBuilder);
  public form: FormGroup;
  public result: string[] = [];

  @ViewChildren(SignatureFieldComponent) public sigs: QueryList<SignatureFieldComponent>;
  @ViewChildren('sigContainer') public sigContainer: QueryList<ElementRef>;

  constructor() {
    const controls = [...Array(this.items.length)].map((value, index) => {
      return {[`signatureField${index}`]: ['', Validators.required]};
    });
    this.form = this.fb.group(Object.assign({}, ...controls));
  }

  public updateSigPreview(idx: number, data: string) {
    this.result[idx] = data;
  }

  public size(sig: SignatureFieldComponent) {
    sig.signaturePad.set('canvasWidth', sig.nativeElement.clientWidth - 40);
    sig.signaturePad.set('canvasHeight', sig.nativeElement.clientHeight);
  }

  public submit() {
    this.result = this.sigs.map(signature => signature.signature);
    console.log('CAPTURED SIGNATURES:', this.result);
  }

  public clear() {
    this.sigs.forEach((signature) => signature.signaturePad.clear());
    this.form.reset();
    this.result = [];
  }
}
