import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  ArcRotateCamera,
  AssetContainer, Camera, Color3,
  Engine,
  HemisphericLight, PointLight,
  Scene,
  SceneLoader, Tools, TransformNode,
  Vector3
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "pepjs";
import {MODELS} from "./app.constants";
import {ModelDefinition} from "./app.model";
import {AppService} from "./app.service";
import {filter} from "rxjs/operators";
import {AdvancedDynamicTexture, Control, Slider, StackPanel, TextBlock} from "@babylonjs/gui";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterContentInit {
  private engine: Engine;
  @ViewChild("canvas", {static: true}) private canvas: ElementRef<HTMLCanvasElement>;
  private scene: Scene;
  readonly models: ModelDefinition[] = MODELS;
  private container: AssetContainer;
  currentModel: ModelDefinition;
  private camera: ArcRotateCamera;
  private light: PointLight;
  creditVisible: boolean = true;
  private babUi: AdvancedDynamicTexture;
  mainLight: TransformNode;

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.appService.currentModel$.pipe(filter(model => model !== null)).subscribe(model => this.loadModel(model))
  }

  ngAfterContentInit() {
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
    });

    this.appService.loadModel(this.models[0]);
  }

  loadModel(model: ModelDefinition) {
    this.container?.removeAllFromScene();
    return SceneLoader.LoadAssetContainerAsync(
      model.rootUrl,
      model.sceneFile,
      this.scene
    ).then(container => {
      this.container = container;
      container.addAllToScene();
      this.currentModel = model;
      this.currentModel.rootMesh = container.meshes[0];
      this.camera.target = container.meshes[0].position;

      // Assume first mesh is root
      this.currentModel.rootMesh.rotation = model.rotationCorrection.clone();
      for (let mesh of container.meshes) {
        mesh.scaling = new Vector3(model.scaleCorrection, model.scaleCorrection, model.scaleCorrection);
      }

      this.engine.hideLoadingUI();
    })
  }

  private createCamera(scene: Scene) {
    const alpha = 0;
    const beta = Math.PI / 2;

    const camera = new ArcRotateCamera(
      'camera',
      alpha,
      beta,
      30,
      Vector3.Zero(),
      scene
    );

    camera.lowerAlphaLimit = alpha;
    camera.upperAlphaLimit = alpha;
    camera.lowerBetaLimit = beta;
    camera.upperBetaLimit = beta;
    camera.lowerRadiusLimit = 8;
    camera.upperRadiusLimit = 100;
    camera.wheelPrecision = 15; // Higher is less sensitive

    return camera;
  }

  private createLight(scene: Scene, camera: Camera) {
    const ambient = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
    ambient.intensity = 0.1;
    this.mainLight = new TransformNode("lightGroup", scene)
    const light = new PointLight("pointLight", this.mainLight.position.clone().set(30, 0, 0), scene);
    // light.diffuse = new Color3(100, 10, 10)
    light.parent = this.mainLight;

    light.intensity = 1500;
    return light;
  }

  onLightRotationChange(rotation: Vector3) {
    console.log(rotation);
    this.mainLight.rotation = rotation;
  }

  onObjectRotationChange(rotation: Vector3) {
    console.log(rotation);
    if (this.currentModel?.rootMesh) {
      this.currentModel.rootMesh.rotation = rotation;
    }
  }
}
