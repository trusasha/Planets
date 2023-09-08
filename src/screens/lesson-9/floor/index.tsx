import {useThree} from '@react-three/fiber/native';
import React, {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {BufferGeometry, Material, Mesh, NormalBufferAttributes} from 'three';
import * as THREE from 'three';
import {TextureLoader} from 'expo-three';

export interface IFloorRef {
  getPosition: () => THREE.Vector3 | undefined;
}

const Floor = forwardRef<IFloorRef>((props, ref) => {
  const mesh = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null);

  const map = new TextureLoader().load(require('../assets/textures/grass/color.jpg'));
  const aoMap = new TextureLoader().load(
    require('../assets/textures/grass/ambient-occlusion.jpg')
  );
  const normalMap = new TextureLoader().load(require('../assets/textures/grass/normal.jpg'));
  const roughnessMap = new TextureLoader().load(require('../assets/textures/grass/roughness.jpg'));

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

  useImperativeHandle(ref, () => ({
    getPosition: () => mesh.current?.position,
  }));

  useEffect(() => {
    map.wrapS = THREE.RepeatWrapping;
    aoMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapS = THREE.RepeatWrapping;
    roughnessMap.wrapS = THREE.RepeatWrapping;

    map.wrapT = THREE.RepeatWrapping;
    aoMap.wrapT = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    roughnessMap.wrapT = THREE.RepeatWrapping;

    map.repeat.set(8, 8);
    aoMap.repeat.set(8, 8);
    normalMap.repeat.set(8, 8);
    roughnessMap.repeat.set(8, 8);
  });

  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} ref={mesh} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial
        color={new THREE.Color('#a9c388')}
        map={map}
        aoMap={aoMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
      />
    </mesh>
  );
});

export default Floor;
