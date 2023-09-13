import * as THREE from 'three';
import { useEffect, useState } from 'react';
import ExpoTHREE from 'expo-three';

const loadAssets = (pathToObj: string, pathToMlt: string) =>
  new Promise<any>(async (res, rej) => {
    try {
      const obj = await ExpoTHREE.loadAsync(
        [
          pathToObj,
          pathToMlt,
        ],
        undefined
      );

      res(obj)
    } catch (error) {
      rej(`Error: ${error}`)
    }
  });

/**
 * Custom hook for loading obj models
 */
const useObjLoader = (pathToObj: string, pathToMlt: string) => {
  const [obj, setObj] = useState<THREE.Group | null>(null);

  useEffect(() => {
    loadAssets(pathToObj, pathToMlt).then(setObj).catch(console.log)
  }, [])

  return [obj]
}

export default useObjLoader;