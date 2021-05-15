import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {
  ArcRotateCamera,
  AssetContainer, Camera,
  Engine,
  HemisphericLight, PointLight,
  Scene,
  SceneLoader,
  Vector3
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import "pepjs";
import {MODELS} from "./app.constants";
import {Model} from "./app.model";
import {ModelSelectorComponent} from "./model-selector/model-selector.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  private engine: Engine;
  @ViewChild("canvas", {static: true}) private canvas: ElementRef<HTMLCanvasElement>;
  private scene: Scene;
  readonly models: Model[] = MODELS;
  private container: AssetContainer;
  currentModel: Model;
  private camera: ArcRotateCamera;
  private light: PointLight;

  @ViewChild(ModelSelectorComponent) private modelSelector: ModelSelectorComponent;

  ngAfterViewInit() {
    this.engine = new Engine(this.canvas.nativeElement, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

    window.addEventListener('resize', () => {
      this.engine.resize();
    });

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    this.main();
  }

  private async main() {
    this.engine.displayLoadingUI();

    this.scene = new Scene(this.engine);

    this.camera = this.createCamera(this.scene);
    this.camera.attachControl(this.canvas, true);
    this.light = this.createLight(this.scene, this.camera);

    this.scene.registerBeforeRender(() => {
      this.light.position = this.camera.position;
    });

    this.modelSelector.selectModel(this.models[0]);
  }

  loadModel(model: Model) {
    this.container?.removeAllFromScene();
    return SceneLoader.LoadAssetContainerAsync(
      model.rootUrl,
      model.sceneFile,
      this.scene
    ).then(container => {
      this.container = container;
      container.addAllToScene();
      this.currentModel = model;
      this.camera.target = container.meshes[0].position;

      // Assume first mesh is root
      const rootMesh = container.meshes[0];
      rootMesh.rotation = model.rotationCorrection;
      for (let mesh of container.meshes) {
        mesh.scaling = new Vector3(model.scaleCorrection, model.scaleCorrection, model.scaleCorrection);
      }

      this.engine.hideLoadingUI();
    })
  }

  private createCamera(scene: Scene) {
    const camera = new ArcRotateCamera(
      'camera',
      0,
      Math.PI / 2,
      30,
      Vector3.Zero(),
      scene
    );

    camera.lowerRadiusLimit = 8;
    camera.upperRadiusLimit = 100;
    camera.wheelPrecision = 15; // Higher is less sensitive

    return camera;
  }

  private createLight(scene: Scene, camera: Camera) {
    const ambient = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
    ambient.intensity = 0.5;
    const light =  new PointLight("Omni", camera.position, scene);

    light.intensity = 50;
    return light;
  }
}
