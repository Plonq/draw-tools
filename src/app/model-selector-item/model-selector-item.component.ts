import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { ModelDefinition } from "../app.model";

@Component({
  selector: "[model-selector-item]",
  templateUrl: "model-selector-item.component.html",
  styleUrls: ["model-selector-item.component.scss"],
  host: {
    "[style.background-image]": "backgroundImg",
    "[disabled]": "disabled",
  },
})
export class ModelSelectorItemComponent implements OnInit {
  @Input() model: ModelDefinition;
  @Input() disabled: boolean = false;

  constructor() {}

  ngOnInit() {}

  get backgroundImg() {
    return this.model && `url(${this.model.rootUrl}${this.model?.thumbImg})`;
  }
}
