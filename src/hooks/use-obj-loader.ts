import * as THREE from 'three';
import { useEffect, useState } from 'react';
import loadObjAssets from '../utils/load-obj-asset';

/**
 * Custom hook for loading obj models
 */
const useObjLoader = (pathToObj: string, pathToMlt: string) => {
  const [obj, setObj] = useState<THREE.Group | null>(null);

  useEffect(() => {
    loadObjAssets(pathToObj, pathToMlt).then(setObj).catch(console.log)
  }, [])

  return [obj]
}

export default useObjLoader;