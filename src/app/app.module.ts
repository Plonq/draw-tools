import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {AppComponent} from './app.component';
import {ModelSelectorComponent} from "./model-selector/model-selector.component";
import {ModelSelectorItemComponent} from "./model-selector-item/model-selector-item.component";
import {GuiComponent} from "./gui/gui.component";
import {AppService} from "./app.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {HudComponent} from "./hud/hud.component";

@NgModule({
  declarations: [AppComponent, ModelSelectorComponent, ModelSelectorItemComponent, GuiComponent, HudComponent],
  imports: [BrowserModule, CommonModule, BrowserAnimationsModule, MaterialModule],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
