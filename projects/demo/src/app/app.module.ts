import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, provideZoneChangeDetection} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {SignatureFieldComponent} from './signature-field/signature-field.component';
import {AngularSignaturePadModule} from 'angular-signature-pad';
import {NgOptimizedImage} from "@angular/common";
import {SignatureViewComponent} from "projects/demo/src/app/signature-view/signature-view.component";

@NgModule({
  declarations: [
    AppComponent,
    SignatureFieldComponent,
    SignatureViewComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSignaturePadModule,
    NgOptimizedImage
  ],
  providers: [provideZoneChangeDetection({eventCoalescing: true})]
})
export class AppModule {
}
