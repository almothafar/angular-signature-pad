# Angular Signature Pad

[![npm downloads](https://img.shields.io/npm/dt/@almothafar/angular-signature-pad.svg)](https://www.npmjs.com/package/@almothafar/angular-signature-pad)
[![npm version](https://img.shields.io/npm/v/@almothafar/angular-signature-pad.svg)](https://www.npmjs.com/package/@almothafar/angular-signature-pad)
[![npm license](https://img.shields.io/npm/l/@almothafar/angular-signature-pad.svg)](https://www.npmjs.com/package/@almothafar/angular-signature-pad)
[![GitHub issues](https://img.shields.io/github/issues/almothafar/angular-signature-pad.svg)](https://github.com/almothafar/angular-signature-pad/issues)


Angular component for [szimek/signature_pad](https://www.npmjs.com/package/signature_pad).

## Install

```shell
npm install @almothafar/angular-signature-pad --save
```

## Reference Implementation

* [Live Demo](http://lathonez.com/angular2-signaturepad-demo/)
* [Source](https://github.com/lathonez/angular2-signaturepad-demo)

## Usage example

API is identical to [szimek/signature_pad](https://www.npmjs.com/package/signature_pad).

Options are as per [szimek/signature_pad](https://www.npmjs.com/package/signature_pad) with the following additions:

* canvasWidth: width of the canvas (px)
* canvasHeight: height of the canvas (px)

The above options are provided to avoid accessing the DOM directly from your component to adjust the canvas size.

```typescript

// import into app module

import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';

...

@NgModule({
  declarations: [ ],
  imports: [ AngularSignaturePadModule ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})

// then import for use in a component

import { Component, ViewChild } from '@angular/core';
import { SignaturePadComponent } from '@almothafar/angular-signature-pad';

@Component({
  template: '<signature-pad #signature [options]="signaturePadOptions" (drawStart)="drawStart($event)" (drawEnd)="drawComplete($event)"></signature-pad>'
})

export class SignaturePadPage {

  @ViewChild('signature')
  public signaturePad: SignaturePadComponent;

  private signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 300
  };

  constructor() {
    // no-op
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onEnd event
    console.log('Completed drawing', event);
    console.log(this.signaturePad.toDataURL());
  }

  drawStart(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('Start drawing', event);
  }
}
```
