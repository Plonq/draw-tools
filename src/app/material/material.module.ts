import { NgModule } from "@angular/core";
import { MatSliderModule } from "@angular/material/slider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from "@angular/material/menu";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatSnackBarModule } from "@angular/material/snack-bar";

const materialModules = [
  MatSliderModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatMenuModule,
  ClipboardModule,
  MatSnackBarModule,
];

@NgModule({
  imports: [materialModules],
  exports: [materialModules],
  providers: [],
})
export class MaterialModule {}
