import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SttopwatchComponent } from './sttopwatch/sttopwatch.component';

@NgModule({
  declarations: [
    AppComponent,
    SttopwatchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
