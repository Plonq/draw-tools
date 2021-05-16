import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Model} from "../app.model";
import {AppService} from "../app.service";

@Component({
  selector: 'model-selector',
  templateUrl: 'model-selector.component.html',
  styleUrls: ["model-selector.component.css"],
})

export class ModelSelectorComponent implements OnInit {
  @Input() models: Model[];
  @Output() modelSelected = new EventEmitter<Model>();

  constructor(public appService: AppService) {
  }

  ngOnInit() {
  }

  selectModel(model: Model) {
    this.appService.loadModel(model)
  }
}
