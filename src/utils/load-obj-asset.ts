import ExpoTHREE from 'expo-three';

const loadObjAsset = (pathToObj: string, pathToMlt: string) =>
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

export default loadObjAsset