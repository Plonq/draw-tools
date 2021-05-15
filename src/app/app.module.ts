import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {AppComponent} from './app.component';
import {ModelSelectorComponent} from "./model-selector/model-selector.component";
import {ModelSelectorItemComponent} from "./model-selector-item/model-selector-item.component";

@NgModule({
  declarations: [AppComponent, ModelSelectorComponent, ModelSelectorItemComponent],
  imports: [BrowserModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
