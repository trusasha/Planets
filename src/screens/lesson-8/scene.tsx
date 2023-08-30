import React, {FC, useEffect, useRef} from 'react';
import {useFrame, useThree} from '@react-three/fiber/native';
import Object, {IObjectRef} from './object';
import * as THREE from 'three';
import {IOrbitControl} from '../../utils/use-orbit-control';

interface IScene {
  moveCamera: IOrbitControl['moveCamera'];
}

const Scene: FC<IScene> = ({moveCamera}) => {
  const mesh = useRef<IObjectRef>(null);
  const rectAreaLightRef = useRef<THREE.RectAreaLight>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);

  useThree(({}) => {});

  useFrame(({camera}) => {
    moveCamera(camera, mesh.current?.getPosition());
  });

  useEffect(() => {
    const meshPosition = mesh.current?.getPosition();

    if (meshPosition) {
      rectAreaLightRef.current?.lookAt(meshPosition);
    }
  }, []);

  return (
    <>
      <ambientLight color={new THREE.Color('#ffffff')} intensity={0.3} />
      <directionalLight
        color={new THREE.Color('#ffffff')}
        intensity={0.5}
        position={[2, 2, -1]}
        castShadow
        shadow-mapSize={1024}
        ref={directionalLightRef}
      />
      <spotLight
        color={new THREE.Color('#ffffff')}
        position={[0, 2, 2]}
        castShadow
        intensity={0.4}
        distance={10}
        shadow-mapSize={1024}
      />

      <Object type="sphere" castShadow ref={mesh} />
      <Object
        type="plane"
        isAnimationDisabled
        rotation={[-Math.PI * 0.5, 0, 0]}
        position={[0, -0.65, 0]}
        receiveShadow
      />
      <shadowMaterial transparent opacity={0.4} />
    </>
  );
};

export default Scene;
