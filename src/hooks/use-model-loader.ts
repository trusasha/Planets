import * as THREE from 'three';
import { useEffect, useState } from "react";
import loadModel, { IModelLoaderConfig } from "../utils/load-model";

/**
 * Hook for loading of .obj/.glb models (see examples in 13 lesson)
 */
const useModelLoader = (config: IModelLoaderConfig) => {
  const [model, setModel] = useState<THREE.Group | null>(null)

  useEffect(() => {
    loadModel(config).then(setModel)
  }, [])

  return [model]
}

export default useModelLoader;