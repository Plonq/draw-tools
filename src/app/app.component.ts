import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  ArcRotateCamera,
  AssetContainer, Camera,
  Engine,
  HemisphericLight, PointLight,
  Scene,
  SceneLoader, Tools,
  Vector3
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
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
      this.light.position = this.camera.position;
    });

    this.setUpBabGui();

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
    ambient.intensity = 0.5;
    const light = new PointLight("Omni", camera.position, scene);

    light.intensity = 50;
    return light;
  }

  setUpBabGui() {
   this.babUi = AdvancedDynamicTexture.CreateFullscreenUI("UI");

    const panel = new StackPanel();
    panel.width = "220px";
    panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    this.babUi.addControl(panel);

    const yRotateText = new TextBlock();
    yRotateText.text = "Y-rotation: 0 deg";
    yRotateText.height = "30px";
    yRotateText.color = "white";
    panel.addControl(yRotateText);

    const yRotateSlider = new Slider();
    yRotateSlider.minimum = 0;
    yRotateSlider.maximum = 2 * Math.PI;
    yRotateSlider.value = 0;
    yRotateSlider.height = "20px";
    yRotateSlider.width = "200px";
    yRotateSlider.onValueChangedObservable.add((value) => {
        yRotateText.text = "Y-rotation: " + (Tools.ToDegrees(value) | 0) + " deg";
        if (this.currentModel?.rootMesh) {
            this.currentModel.rootMesh.rotation.y = value;
        }
    });
    panel.addControl(yRotateSlider);

    const xRotateText = new TextBlock();
    xRotateText.text = "X-rotation: 0 deg";
    xRotateText.height = "30px";
    xRotateText.color = "white";
    panel.addControl(xRotateText);

    const xRotateSlider = new Slider();
    xRotateSlider.minimum = 0;
    xRotateSlider.maximum = 2 * Math.PI;
    xRotateSlider.value = 0;
    xRotateSlider.height = "20px";
    xRotateSlider.width = "200px";
    xRotateSlider.onValueChangedObservable.add((value) => {
      xRotateText.text = "X-rotation: " + (Tools.ToDegrees(value) | 0) + " deg";
      if (this.currentModel?.rootMesh) {
        this.currentModel.rootMesh.rotation.x = value;
      }
    });
    panel.addControl(xRotateSlider);

    const zRotateText = new TextBlock();
    zRotateText.text = "Z-rotation: 0 deg";
    zRotateText.height = "30px";
    zRotateText.color = "white";
    panel.addControl(zRotateText);

    const zRotateSlider = new Slider();
    zRotateSlider.minimum = 0;
    zRotateSlider.maximum = 2 * Math.PI;
    zRotateSlider.value = 0;
    zRotateSlider.height = "20px";
    zRotateSlider.width = "200px";
    zRotateSlider.onValueChangedObservable.add((value) => {
      zRotateText.text = "Z-rotation: " + (Tools.ToDegrees(value) | 0) + " deg";
      if (this.currentModel?.rootMesh) {
        this.currentModel.rootMesh.rotation.z = value;
      }
    });
    panel.addControl(zRotateSlider);

    this.appService.currentModel$.pipe(filter(model => model !== null)).subscribe(model => {
      yRotateSlider.value = model.rotationCorrection.y;
      xRotateSlider.value = model.rotationCorrection.x;
      zRotateSlider.value = model.rotationCorrection.z;
    })
  }
}
