import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {
  ArcRotateCamera,
  AssetContainer, Camera,
  DirectionalLight,
  Engine,
  HemisphericLight, PointLight,
  Scene,
  SceneLoader, SpotLight, TransformNode,
  Vector3
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import "pepjs";
import {MODELS} from "./app.constants";
import {Model} from "./app.model";

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

    this.engine.hideLoadingUI();

    this.scene.registerBeforeRender(() => {
      this.light.position = this.camera.position;
    });
  }

  loadModel(model: Model) {
    this.container?.removeAllFromScene();
    return SceneLoader.LoadAssetContainerAsync(
      model.rootUrl,
      model.sceneFile,
      this.scene
    ).then(container => {
      // this.camera.target = meshes[0]
      this.container = container;
      container.addAllToScene();
      this.currentModel = model;
      // return meshes;
      this.camera.target = container.meshes[0].position;
    })
  }

  private createCamera(scene: Scene) {
    const alpha = Math.PI / 2;
    const beta = Math.PI / 2;
    const camera = new ArcRotateCamera(
      'camera',
      alpha,
      beta,
      30,
      Vector3.Zero(),
      scene
    );

    // camera.lowerAlphaLimit = alpha;
    // camera.upperAlphaLimit = alpha;
    // camera.lowerBetaLimit = beta;
    // camera.upperBetaLimit = beta;
    camera.lowerRadiusLimit = 10;
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
