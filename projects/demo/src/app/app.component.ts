import {AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignatureFieldComponent} from './signature-field/signature-field.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {

  public title = '@almothafar/angular-signature-pad demo';
  public form: FormGroup;

  @ViewChildren(SignatureFieldComponent) public sigs: QueryList<SignatureFieldComponent>;
  @ViewChild ('sigContainer1') public sigContainer1: ElementRef;
  @ViewChild ('sigContainer2') public sigContainer2: ElementRef;
  @ViewChild ('sigContainer3') public sigContainer3: ElementRef;

  constructor(fb: FormBuilder) {

    this.form = fb.group({
      signatureField1: ['', Validators.required],
      signatureField2: ['', Validators.required],
      signatureField3: ['', Validators.required]
    });
  }

  public ngAfterViewInit() {
    this.size(this.sigContainer1, this.sigs.first);
    this.size(this.sigContainer2, this.sigs.get(1));
    this.size(this.sigContainer3, this.sigs.last);
  }

  // set the dimensions of the signature pad canvas
  public beResponsive() {
    this.sigs.first.signaturePad.set('canvasWidth', this.sigContainer1.nativeElement.clientWidth);
    this.sigs.get(1).signaturePad.set('canvasWidth', this.sigContainer2.nativeElement.clientWidth);
    this.sigs.last.signaturePad.set('canvasWidth', this.sigContainer3.nativeElement.clientWidth);
  }

  public size(container: ElementRef, sig: SignatureFieldComponent) {
    sig.signaturePad.set('canvasWidth', container.nativeElement.clientWidth);
    sig.signaturePad.set('canvasHeight', container.nativeElement.clientHeight);
  }

  public submit() {
    console.log('CAPTURED SIGS:');
    console.log(this.sigs.first.signature);
    console.log(this.sigs.get(1).signature);
    console.log(this.sigs.last.signature);
  }

  public clear() {
    this.sigs.first.clear();
    this.sigs.get(1).clear();
    this.sigs.last.clear();
  }
}
