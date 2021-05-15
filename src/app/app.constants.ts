import {Model} from "./app.model";
import {Vector3} from "@babylonjs/core";

export const MODELS: Model[] = [
  {
    name: "Loomis Head",
    rootUrl: "/assets/models/loomis-head/",
    sceneFile: "scene.gltf",
    credit: "\"Loomis Head\" (https://skfb.ly/TZQU) by Joel is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
    thumbImg: "thumb.jpg",
    scaleCorrection: 1,
    rotationCorrection: new Vector3(0, Math.PI / 2, 0),
  },
  {
    name: "Loomis Head - Planes",
    rootUrl: "/assets/models/loomis-head-planes/",
    sceneFile: "scene.gltf",
    credit: "\"Loomis Head - Planes & essential form\" (https://skfb.ly/6Xprx) by cgmonkey is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
    thumbImg: "thumb.jpg",
    scaleCorrection: 1.5,
    rotationCorrection: new Vector3(0, 0, 0),
  }
]
