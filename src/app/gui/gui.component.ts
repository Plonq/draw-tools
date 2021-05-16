import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Model} from "../app.model";
import {ModelSelectorComponent} from "../model-selector/model-selector.component";

@Component({
  selector: 'gui',
  templateUrl: 'gui.component.html',
  styleUrls: ['gui.component.css']
})

export class GuiComponent implements OnInit {
  @Input() models: Model[];
  guiVisible: boolean = true;
  hideTimeout: number;

  @ViewChild(ModelSelectorComponent) private modelSelector: ModelSelectorComponent;

  constructor() {
  }

  ngOnInit() {
    this.hideTimeout = window.setTimeout(() => {
      this.guiVisible = false
    }, 3000)
  }

  @HostListener("mouseenter")
  onMouseEnter() {
    window.clearTimeout(this.hideTimeout);
    this.guiVisible = true;
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    window.clearTimeout(this.hideTimeout);
    this.hideTimeout = window.setTimeout(() => {
      this.guiVisible = false;
    }, 1000)
  }
}
