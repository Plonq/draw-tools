import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModelDefinition} from "../app.model";
import {AppService} from "../app.service";

@Component({
  selector: 'model-selector',
  templateUrl: 'model-selector.component.html',
  styleUrls: ["model-selector.component.css"],
  host: {
    "[class.loading]": "loading",
  }
})

export class ModelSelectorComponent implements OnInit {
  @Input() models: ModelDefinition[];
  @Output() modelSelected = new EventEmitter<ModelDefinition>();
  @Input() loading: boolean = false;

  constructor(public appService: AppService) {
  }

  ngOnInit() {
  }

  selectModel(model: ModelDefinition) {
    this.appService.loadModel(model)
  }
}
