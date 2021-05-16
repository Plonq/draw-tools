import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {AppComponent} from './app.component';
import {ModelSelectorComponent} from "./model-selector/model-selector.component";
import {ModelSelectorItemComponent} from "./model-selector-item/model-selector-item.component";
import {GuiComponent} from "./gui/gui.component";
import {AppService} from "./app.service";

@NgModule({
  declarations: [AppComponent, ModelSelectorComponent, ModelSelectorItemComponent, GuiComponent],
  imports: [BrowserModule, CommonModule],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
