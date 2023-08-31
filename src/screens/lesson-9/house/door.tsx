import {useLoader, useThree} from '@react-three/fiber/native';
import React, {useRef} from 'react';
import * as THREE from 'three';
import {BufferGeometry, Material, Mesh, NormalBufferAttributes} from 'three';
import withCentimeter from '../../../helpers/with-santimeter';

const Door = () => {
  const mesh = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null);

  const [
    map,
    alpha,
    displacementMap,
    ambientOcclusionTexture,
    normalTexture,
    metalnessTexture,
    roughnessTexture,
  ] = useLoader(THREE.TextureLoader, [
    require('../assets/textures/door/color.jpg'),
    require('../assets/textures/door/alpha.jpg'),
    require('../assets/textures/door/height.jpg'),
    require('../assets/textures/door/ambient-occlusion.jpg'),
    require('../assets/textures/door/normal.jpg'),
    require('../assets/textures/door/metalness.jpg'),
    require('../assets/textures/door/roughness.jpg'),
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
    <mesh position={[0, 1, withCentimeter(2)]}>
      <planeBufferGeometry args={[2.2, 2.2, 100, 100]} />
      <meshStandardMaterial
        color={new THREE.Color('#aa7b7b')}
        map={map}
        alphaMap={alpha}
        displacementMap={displacementMap}
        aoMap={ambientOcclusionTexture}
        normalMap={normalTexture}
        metalnessMap={metalnessTexture}
        roughnessMap={roughnessTexture}
        displacementScale={0.1}
        transparent
      />
    </mesh>
  );
};

export default Door;
