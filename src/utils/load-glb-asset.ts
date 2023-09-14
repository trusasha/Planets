

import { FileSystem } from 'react-native-unimodules';
import { decode } from 'base64-arraybuffer';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import loadFileAsync from './load-file-async';

/**
 * Simple glb loader
 * @param asset Path to your .glb file via require(...)
 */
const loadGlbAsset = async (asset: string, loaderPath?: string) => {
  const uri = await loadFileAsync({
    asset,
    funcName: 'loadGLTFAsync',
  });

  if (!uri) {
    return;
  }

  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const arrayBuffer = decode(base64);

  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.parse(
      arrayBuffer,
      loaderPath,
      resolve,
      reject,
    );
  });
}

export default loadGlbAsset