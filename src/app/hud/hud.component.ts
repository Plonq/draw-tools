import {
  Component,
  EventEmitter,
  HostBinding,
  Inject,
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
export class HudComponent implements OnInit {
  @Input() models: ModelDefinition[];
  @Input() lightRotation: Vector3;
  @Output() lightRotationChange = new EventEmitter<Vector3>();
  @Input() lightIntensity: number;
  @Output() lightIntensityChange = new EventEmitter<number>();
  @Input() ambientLightIntensity: number;
  @Output() ambientLightIntensityChange = new EventEmitter<number>();
  @Input() objectRotation: Vector3;
  @Output() objectRotationChange = new EventEmitter<Vector3>();

  @HostBinding("class.hide-controls")
  hidden: boolean = false;

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

  constructor() {}

  ngOnInit() {
    this.loadFromQueryParams();
  }

  private loadFromQueryParams() {
    const params = new URLSearchParams(window.location.search);

    setTimeout(() => {
      this.ambientLightIntensity =
        Number(params.get("light-a-i")) ?? this.ambientLightIntensity;
      this.lightIntensity =
        Number(params.get("light-d-i")) ?? this.lightIntensity;
      this.lightIntensityChange.emit(this.lightIntensity);
      this.ambientLightIntensityChange.emit(this.ambientLightIntensity);
      this.lightRotation.y =
        Number(params.get("light-d-r-y")) ?? this.lightRotation.y;
      this.lightRotation.z =
        Number(params.get("light-d-r-z")) ?? this.lightRotation.z;
      this.objectRotation.x =
        Number(params.get("obj-r-x")) ?? this.objectRotation.x;
      this.objectRotation.y =
        Number(params.get("obj-r-y")) ?? this.objectRotation.y;
      this.objectRotation.z =
        Number(params.get("obj-r-z")) ?? this.objectRotation.z;
    });
  }

  private saveToQueryParams() {
    const params = new URLSearchParams();
    params.set("light-a-i", this.ambientLightIntensity.toString());
    params.set("light-d-i", this.lightIntensity.toString());
    params.set("light-d-r-y", this.lightRotation.y.toString());
    params.set("light-d-r-z", this.lightRotation.z.toString());
    params.set("obj-r-x", this.objectRotation.x.toString());
    params.set("obj-r-y", this.objectRotation.y.toString());
    params.set("obj-r-z", this.objectRotation.z.toString());
    window.history.replaceState(null, null, `?${params.toString()}`);
  }

  private onChanges() {
    this.saveToQueryParams();
  }

  toggleVisibility() {
    this.hidden = !this.hidden;
  }

  onLightRotation(event: MatSliderChange, type: "y" | "z") {
    this.lightRotation[type] = -event.value;
    this.lightIntensityChange.emit(this.lightIntensity);

    this.onChanges();
  }

  onLightIntensityChange(value: number) {
    this.lightIntensity = value;
    this.lightIntensityChange.emit(this.lightIntensity);

    this.onChanges();
  }

  onAmbientLightIntensityChange(value: number) {
    this.ambientLightIntensity = value;
    this.ambientLightIntensityChange.emit(this.ambientLightIntensity);

    this.onChanges();
  }

  onObjectRotation(event: MatSliderChange, type: "x" | "y" | "z") {
    let val = event.value;
    if (type === "y" || type === "z") {
      val = -val;
    }
    this.objectRotation[type] = val;
    this.objectRotationChange.emit(this.objectRotation);

    this.onChanges();
  }
}
