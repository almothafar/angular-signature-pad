import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, provideZoneChangeDetection} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {SignatureFieldComponent} from './signature-field/signature-field.component';
import {AngularSignaturePadModule} from 'angular-signature-pad';

@NgModule({
  declarations: [
    AppComponent,
    SignatureFieldComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSignaturePadModule
  ],
  providers: [provideZoneChangeDetection({eventCoalescing: true})]
})
export class AppModule {
}
