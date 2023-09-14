import { loadTextureAsync } from "expo-three";
import loadGlbAsset from "./load-glb-asset";
import * as THREE from 'three';
import loadObjAsset from "./load-obj-asset";

interface IVector {
  x: number;
  y: number;
  z: number;
}

export interface IModelLoaderConfig {
  type: 'glb' | 'obj';
  name: string;
  model: string;
  /**
   * Path to .mtl via require()
   */
  material?: string;
  textures?: { name: string, image: string }[];
  scale?: IVector;
  position?: IVector;
  rotation?: IVector;
}

/**
 * Helps to load .obj/.glb models
 */
const loadModel = (config: IModelLoaderConfig) => new Promise<THREE.Group>(async (res, rej) => {
  const texturesLength = config.textures?.length || 0;
  const textures = [];

  try {
    for (let i = 0; i < texturesLength; i++) {
      const texture = await loadTextureAsync({
        asset: config.textures[i].image,
      });

      if (config.type === 'glb') {
        texture.flipY = false;
      }

      textures.push({ name: config.textures[i]?.name || '-', map: texture });
    }

    let obj = null;

    switch (config.type) {
      case "glb": {
        const result = await loadGlbAsset(config.model);
        obj = result.scene;

        break
      }
      case 'obj': {
        const result = await loadObjAsset(config.model, config.material)
        obj = result

        break
      }
    }

    if (texturesLength) {
      if (texturesLength === 1) {
        obj.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.material.map = textures[0]?.map;
          }
        });
      } else {
        obj.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            const selected = textures?.find(x => x.name === object.name);
            object.material.map = selected?.map;
          }
        });
      }
    }

    if (config.scale) {
      obj.scale.set(config.scale.x, config.scale.y, config.scale.z);
    }

    if (config.position) {
      obj.position.set(config.position.x, config.position.y, config.position.z);
    }

    if (config.rotation) {
      obj.rotation.x = config.rotation.x;
      obj.rotation.y = config.rotation.y;
      obj.rotation.z = config.rotation.z;
    }

    res(obj)
  } catch (error) {
    rej(error)
  }
})

export default loadModel