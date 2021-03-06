import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  ArcRotateCamera,
  AssetContainer,
  Engine,
  HemisphericLight,
  Light,
  PointLight,
  Scene,
  SceneLoader,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";
import "pepjs";
import { MODELS } from "./app.constants";
import { ModelDefinition } from "./app.model";
import { AppService } from "./app.service";
import { filter } from "rxjs/operators";
import { getQueryParam, setQueryParam } from "./utils";
import { Clipboard } from "@angular/cdk/clipboard";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterContentInit {
  private engine: Engine;
  @ViewChild("canvas", { static: true })
  private canvas: ElementRef<HTMLCanvasElement>;
  private scene: Scene;
  readonly models: ModelDefinition[] = MODELS;
  private container: AssetContainer;
  currentModel: ModelDefinition;
  private camera: ArcRotateCamera;
  light: Light;
  ambientLight: Light;
  lightTransform: TransformNode;
  modelTransform: TransformNode;
  init: boolean = false;

  constructor(
    private appService: AppService,
    private clipboard: Clipboard,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.appService.currentModel$
      .pipe(filter((model) => model !== null))
      .subscribe((model) => this.loadModel(model));
  }

  ngAfterContentInit() {
    this.engine = new Engine(this.canvas.nativeElement, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

    window.addEventListener("resize", () => {
      this.engine.resize();
    });

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    this.main();
  }

  private main() {
    this.engine.displayLoadingUI();

    this.scene = new Scene(this.engine);
    this.lightTransform = new TransformNode("lightTransform", this.scene);
    this.modelTransform = new TransformNode("modelTransform", this.scene);

    this.camera = this.createCamera(this.scene);
    this.camera.attachControl(this.canvas, true);
    this.createLight(this.scene);

    this.scene.registerBeforeRender(() => {});

    this.appService.loadModel(this.getModelToLoad());
  }

  loadModel(model: ModelDefinition) {
    this.appService.modelLoading$.next(true);
    this.container?.removeAllFromScene();
    return SceneLoader.LoadAssetContainerAsync(
      model.rootUrl,
      model.sceneFile,
      this.scene
    ).then((container) => {
      this.container = container;
      container.addAllToScene();
      this.currentModel = model;
      // Assume first mesh is root
      this.currentModel.rootMesh = container.meshes[0];
      this.currentModel.rootMesh.parent = this.modelTransform;
      this.camera.target = container.meshes[0].position;

      this.currentModel.rootMesh.rotation = model.rotationCorrection.clone();
      this.currentModel.rootMesh.position = model.positionCorrection.clone();
      for (let mesh of container.meshes) {
        mesh.scaling = new Vector3(
          model.scaleCorrection,
          model.scaleCorrection,
          model.scaleCorrection
        );
      }

      this.engine.hideLoadingUI();
      this.appService.modelLoading$.next(false);
      this.init = true;
      this.saveCurrentModel();
    });
  }

  private createCamera(scene: Scene) {
    const alpha = 0;
    const beta = Math.PI / 2;

    const camera = new ArcRotateCamera(
      "camera",
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

  private createLight(scene: Scene) {
    this.ambientLight = new HemisphericLight(
      "light",
      new Vector3(0, 1, 0),
      scene
    );
    this.ambientLight.intensity = 0.1;
    this.light = new PointLight(
      "pointLight",
      this.lightTransform.position.clone().set(30, 0, 0),
      scene
    );
    // light.diffuse = new Color3(100, 10, 10)
    this.light.parent = this.lightTransform;
    this.light.intensity = 1500;
  }

  private getModelToLoad() {
    let modelToLoad: ModelDefinition = this.models[0]; // Default to first model
    const savedModelId = getQueryParam("model", null);

    if (savedModelId) {
      const model = this.models.find((model) => model.id === savedModelId);
      if (model) {
        modelToLoad = model;
      }
    }

    return modelToLoad;
  }

  private saveCurrentModel() {
    setQueryParam("model", this.currentModel.id);
  }

  share() {
    this.clipboard.copy(window.location.href);
    this.snackbar.open("Link copied to clipboard!", null, { duration: 3000 });
  }
}
