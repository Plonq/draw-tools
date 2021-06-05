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
import { getQueryParam } from "../utils";

@Component({
  selector: "hud",
  templateUrl: "hud.component.html",
  styleUrls: ["hud.component.scss"],
})
export class HudComponent implements OnInit {
  @Input() models: ModelDefinition[];
  @Input() directionalLightRotation: Vector3;
  @Output() directionalLightRotationChange = new EventEmitter<Vector3>();
  @Input() directionalLightIntensity: number;
  @Output() directionalLightIntensityChange = new EventEmitter<number>();
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
  minDirectionalLightIntensity: number = 0;
  maxDirectionalLightIntensity: number = 3000;
  directionalLightIntensityStep: number = 10;
  minAmbientLightIntensity: number = 0;
  maxAmbientLightIntensity: number = 1;
  ambientLightIntensityStep: number = 0.001;

  private defaults: {
    directionalLightIntensity: number;
    ambientLightIntensity: number;
    directionalLightRotation: Vector3;
    objectRotation: Vector3;
  };

  @ViewChild(ModelSelectorComponent)
  private modelSelector: ModelSelectorComponent;

  constructor() {}

  ngOnInit() {
    this.initDefaults();
    this.loadFromQueryParams();
  }

  private initDefaults() {
    this.defaults = {
      directionalLightIntensity: this.directionalLightIntensity,
      ambientLightIntensity: this.ambientLightIntensity,
      directionalLightRotation: this.directionalLightRotation.clone(),
      objectRotation: this.objectRotation.clone(),
    };
  }

  private loadFromQueryParams() {
    setTimeout(() => {
      // Single values - need change emitted
      this.ambientLightIntensity = getQueryParam(
        "light-a-i",
        this.ambientLightIntensity
      );
      this.directionalLightIntensity = getQueryParam(
        "light-d-i",
        this.directionalLightIntensity
      );
      this.directionalLightIntensityChange.emit(this.directionalLightIntensity);
      this.ambientLightIntensityChange.emit(this.ambientLightIntensity);

      // Objects - don't need changed emitted
      this.directionalLightRotation.y = getQueryParam(
        "light-d-r-y",
        this.directionalLightRotation.y
      );
      this.directionalLightRotation.z = getQueryParam(
        "light-d-r-z",
        this.directionalLightRotation.z
      );
      this.objectRotation.x = getQueryParam("obj-r-x", this.objectRotation.x);
      this.objectRotation.y = getQueryParam("obj-r-y", this.objectRotation.y);
      this.objectRotation.z = getQueryParam("obj-r-z", this.objectRotation.z);
    });
  }

  private saveToQueryParams() {
    const params = new URLSearchParams();
    params.set("light-a-i", this.ambientLightIntensity.toString());
    params.set("light-d-i", this.directionalLightIntensity.toString());
    params.set("light-d-r-y", this.directionalLightRotation.y.toString());
    params.set("light-d-r-z", this.directionalLightRotation.z.toString());
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
    this.directionalLightRotation[type] = -event.value;
    this.directionalLightIntensityChange.emit(this.directionalLightIntensity);

    this.onChanges();
  }

  onLightIntensityChange(value: number) {
    this.directionalLightIntensity = value;
    this.directionalLightIntensityChange.emit(this.directionalLightIntensity);

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

  reset() {
    this.directionalLightIntensity = this.defaults.directionalLightIntensity;
    this.ambientLightIntensity = this.defaults.ambientLightIntensity;
    this.directionalLightRotation.set(
      this.defaults.directionalLightRotation.x,
      this.defaults.directionalLightRotation.y,
      this.defaults.directionalLightRotation.z
    );
    this.objectRotation.set(
      this.defaults.objectRotation.x,
      this.defaults.objectRotation.y,
      this.defaults.objectRotation.z
    );

    this.onChanges();
  }
}
