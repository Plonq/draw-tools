import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Model} from "../app.model";

@Component({
  selector: 'model-selector',
  templateUrl: 'model-selector.component.html',
  styleUrls: ["model-selector.component.css"],
})

export class ModelSelectorComponent implements OnInit {
  @Input() models: Model[];
  @Output() modelSelected = new EventEmitter<Model>();
  selectedModel: Model;

  constructor() {
  }

  ngOnInit() {
  }

  public selectModel(model: Model) {
    this.selectedModel = model;
    this.modelSelected.emit(this.selectedModel);
  }
}
