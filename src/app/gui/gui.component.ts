import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Model} from "../app.model";
import {ModelSelectorComponent} from "../model-selector/model-selector.component";
import {AppService} from "../app.service";

@Component({
  selector: 'gui',
  templateUrl: 'gui.component.html',
  styleUrls: ['gui.component.css']
})

export class GuiComponent implements OnInit {
  @Input() models: Model[];
  guiVisible: boolean = true;

  @ViewChild(ModelSelectorComponent) private modelSelector: ModelSelectorComponent;

  constructor(public appService: AppService) {
  }

  ngOnInit() {
  }

  toggleGui() {
    this.guiVisible = !this.guiVisible;
  }
}
