import {useLoader, useThree} from '@react-three/fiber/native';
import React, { useRef } from 'react';
import {BufferGeometry, Material, Mesh, NormalBufferAttributes} from 'three';
import * as THREE from 'three';

const Walls = () => {
  const mesh = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null);

  const [map, aoMap, normalMap, roughnessMap] = useLoader(THREE.TextureLoader, [
    require('../assets/textures/bricks/color.jpg'),
    require('../assets/textures/bricks/ambient-occlusion.jpg'),
    require('../assets/textures/bricks/normal.jpg'),
    require('../assets/textures/bricks/roughness.jpg'),
  ]);

  useThree(() => {
    if (mesh.current) {
     /**
       * We need to add this for supporting aoMap, after 0.151 of three js we don't need to provide this part
       */
      mesh.current.geometry.setAttribute(
        'uv2',
        new THREE.Float32BufferAttribute(mesh.current.geometry.attributes.uv.array, 2)
      );
    }
  });

  return (
    <mesh position={[0, 2.5 / 2, 0]} ref={mesh}>
      <boxGeometry args={[4, 2.5, 4]} />
      <meshStandardMaterial
        color={new THREE.Color('#ac8e82')}
        map={map}
        aoMap={aoMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
      />
    </mesh>
  );
};

export default Walls;
