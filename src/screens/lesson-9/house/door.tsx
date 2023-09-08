import {useThree} from '@react-three/fiber/native';
import React, {useRef} from 'react';
import * as THREE from 'three';
import {BufferGeometry, Material, Mesh, NormalBufferAttributes} from 'three';
import withCentimeter from '../../../helpers/with-santimeter';
import {TextureLoader} from 'expo-three';

const Door = () => {
  const mesh = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null);

  const map = new TextureLoader().load(require('../assets/textures/door/color.jpg'));
  const alpha = new TextureLoader().load(require('../assets/textures/door/alpha.jpg'));
  const displacementMap = new TextureLoader().load(require('../assets/textures/door/height.jpg'));
  const ambientOcclusionTexture = new TextureLoader().load(
    require('../assets/textures/door/ambient-occlusion.jpg')
  );
  const normalTexture = new TextureLoader().load(require('../assets/textures/door/normal.jpg'));
  const metalnessTexture = new TextureLoader().load(
    require('../assets/textures/door/metalness.jpg')
  );
  const roughnessTexture = new TextureLoader().load(
    require('../assets/textures/door/roughness.jpg')
  );

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
