import {AbstractMesh, Vector3} from "@babylonjs/core";

export interface ModelDefinition {
  name: string;
  rootUrl: string;
  sceneFile: string;
  thumbImg: string;
  credit: string;
  scaleCorrection: number;
  rotationCorrection: Vector3,
  rootMesh?: AbstractMesh;
}
