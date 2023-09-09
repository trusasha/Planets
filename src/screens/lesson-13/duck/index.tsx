import React from 'react';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {useLoader} from '@react-three/fiber/native';

/**
 * @TODO
 * Unfortunately at the moment I have not been able to find
 * an adequate way to import gltf into a react-native application.
 * At the moment using obj and mtl seems to be the easier way.
 * We can try using high-level tools like expo-gl, but in this case
 * I didn't want to go much beyond three.js and fiber.
 * Requires further investigation.
 */
const DuckGLB = () => {
  const [{nodes, scene}] = useLoader(GLTFLoader, [
    require('../assets/models/duck/glTF-Binary/Duck.glb'),
  ]);

  return (
    <mesh scale={[10, 10, 10]} receiveShadow>
      <primitive object={scene} />
    </mesh>
  );

  /**
   * Or we can take just a geometry and use our material
   */
  // return (
  //   <mesh scale={[0.1, 0.1, 0.1]} geometry={nodes['LOD3spShape'].geometry} receiveShadow>
  //     <meshNormalMaterial />
  //   </mesh>
  // );
};

export default DuckGLB;
