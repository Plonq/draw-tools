import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { LightProps, ModelDefinition, ModelProps } from "../app.model";
import { ModelSelectorComponent } from "../model-selector/model-selector.component";
import { AppService } from "../app.service";
import {
  AbstractMesh,
  Light,
  Node,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import { MatSliderChange } from "@angular/material/slider";

@Component({
  selector: "hud",
  templateUrl: "hud.component.html",
  styleUrls: ["hud.component.css"],
})
export class HudComponent implements OnInit, OnChanges {
  @Input() models: ModelDefinition[];
  @Input() lightRotation: Vector3;
  @Output() lightRotationChange = new EventEmitter<Vector3>();
  @Input() lightIntensity: number;
  @Output() lightIntensityChange = new EventEmitter<number>();
  @Input() ambientLightIntensity: number;
  @Output() ambientLightIntensityChange = new EventEmitter<number>();
  @Input() objectRotation: Vector3;
  @Output() objectRotationChange = new EventEmitter<Vector3>();

  minXRotation: number = -Math.PI;
  maxXRotation: number = Math.PI;
  minYRotation: number = -Math.PI;
  maxYRotation: number = Math.PI;
  minZRotation: number = -Math.PI;
  maxZRotation: number = Math.PI;
  rotationStep: number = 0.01;
  minIntensity: number = 0;
  maxIntensity: number = 3000;
  intensityStep: number = 10;
  minAmbientIntensity: number = 0;
  maxAmbientIntensity: number = 1;
  ambientIntensityStep: number = 0.001;

  @ViewChild(ModelSelectorComponent)
  private modelSelector: ModelSelectorComponent;

  constructor(public appService: AppService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  onLightRotation(event: MatSliderChange, type: "y" | "z") {
    this.lightRotation[type] = -event.value;
    this.lightIntensityChange.emit(this.lightIntensity);
  }

  onLightIntensityChange(value: number) {
    this.lightIntensity = value;
    this.lightIntensityChange.emit(this.lightIntensity);
  }

  onAmbientLightIntensityChange(value: number) {
    this.ambientLightIntensity = value;
    this.ambientLightIntensityChange.emit(this.ambientLightIntensity);
  }

  obObjectRotation(event: MatSliderChange, type: "x" | "y" | "z") {
    let val = event.value;
    if (type === "y" || type === "z") {
      val = -val;
    }
    this.objectRotation[type] = val;
    this.objectRotationChange.emit(this.objectRotation);
  }
}
