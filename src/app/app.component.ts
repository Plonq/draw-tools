import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Engine} from "@babylonjs/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit{
  private engine: Engine;
  @ViewChild("canvas", {static: true}) private canvas: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    this.engine = new Engine(this.canvas.nativeElement, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }
}
