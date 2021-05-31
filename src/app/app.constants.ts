import {ModelDefinition} from "./app.model";
import {Vector3} from "@babylonjs/core";

export const MODELS: ModelDefinition[] = [
  {
    name: "Loomis Head",
    rootUrl: "/assets/models/loomis-head/",
    sceneFile: "scene.gltf",
    credit: "\"Loomis Head\" (https://skfb.ly/TZQU) by Joel is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
    thumbImg: "thumb.jpg",
    scaleCorrection: 1,
    positionCorrection: Vector3.Zero(),
    rotationCorrection: new Vector3(0, Math.PI / 2, 0),
  },
  {
    name: "Head Planes",
    rootUrl: "/assets/models/loomis-head-planes/",
    sceneFile: "scene.gltf",
    credit: "\"Loomis Head - Planes & essential form\" (https://skfb.ly/6Xprx) by cgmonkey is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
    thumbImg: "thumb.jpg",
    scaleCorrection: 1.7,
    positionCorrection: new Vector3(0, 1, -0.31),
    rotationCorrection: Vector3.Zero(),
  },
  {
    name: "Human Skull",
    rootUrl: "/assets/models/human-skull/",
    sceneFile: "scene.gltf",
    credit: "\"Human Skull\" (https://skfb.ly/6RsWT) by Sergey Egelsky is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
    thumbImg: "thumb.jpg",
    scaleCorrection: 1.9,
    positionCorrection: new Vector3(0, 1, 0),
    rotationCorrection: new Vector3(0, -Math.PI / 2, 0),
  }
]
