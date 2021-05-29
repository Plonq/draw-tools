import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ModelDefinition} from "../app.model";
import {ModelSelectorComponent} from "../model-selector/model-selector.component";
import {AppService} from "../app.service";
import {AbstractMesh, Light, Node, TransformNode, Vector3} from "@babylonjs/core";
import {MatSliderChange} from "@angular/material/slider";

@Component({
  selector: 'hud',
  templateUrl: 'hud.component.html',
  styleUrls: ['hud.component.css']
})

export class HudComponent implements OnInit, OnChanges {
  @Input() models: ModelDefinition[];
  @Input() lightRotation: Vector3;
  @Output() lightRotationChange = new EventEmitter<Vector3>();
  @Input() objectRotation: Vector3;
  @Output() objectRotationChange = new EventEmitter<Vector3>();
  @Input() light: TransformNode;
  @Input() object: AbstractMesh;

  min: number = 0;
  max: number = 2 * Math.PI;
  step: number = 0.01;
  isVisible: boolean = true;

  @ViewChild(ModelSelectorComponent) private modelSelector: ModelSelectorComponent;

  constructor(public appService: AppService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  toggleHud() {
    this.isVisible = !this.isVisible;
  }

  onLightRotation(event: MatSliderChange, type: "y" | "z") {
    this.light.rotation[type] = event.value;
  }

  obObjectRotation(event: MatSliderChange, type: "x" | "y" | "z") {
    this.object.rotation[type] = event.value;
  }
}
