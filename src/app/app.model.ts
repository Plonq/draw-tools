import {AbstractMesh, Vector3} from "@babylonjs/core";

export interface ModelDefinition {
  name: string;
  rootUrl: string;
  sceneFile: string;
  thumbImg: string;
  credit: string;
  scaleCorrection: number;
  positionCorrection: Vector3,
  rotationCorrection: Vector3,
  rootMesh?: AbstractMesh;
}

export interface LightProps {
  rotation: Vector3;
  intensity: number;
}

export interface ModelProps {
  rotation: Vector3;
}
