import {Vector3} from "@babylonjs/core";

export interface Model {
  name: string;
  rootUrl: string;
  sceneFile: string;
  thumbImg: string;
  credit: string;
  scaleCorrection: number;
  rotationCorrection: Vector3,
}
