import {NgModule} from '@angular/core';
import {MatSliderModule} from "@angular/material/slider";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const materialModules = [
  MatSliderModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
]

@NgModule({
  imports: [materialModules],
  exports: [materialModules],
  providers: [],
})
export class MaterialModule {
}
