import React, {FC, useEffect, useRef} from 'react';
import {useFrame} from '@react-three/fiber/native';
import {SharedValue} from 'react-native-reanimated';
import Object, {IObjectRef} from './object';
import * as THREE from 'three';
import animateValueToZero from '@utils/animate-value-to-zero';

interface IScene {
  isPressed: SharedValue<boolean>;
  cursor: SharedValue<{
    x: number;
    y: number;
  }>;
}

const Scene: FC<IScene> = ({isPressed, cursor}) => {
  const mesh = useRef<IObjectRef>(null);
  const rectAreaLightRef = useRef<THREE.RectAreaLight>(null);
  const hemisphereLightRef = useRef<THREE.HemisphereLight>(null);

  useFrame(({camera}) => {
    if (mesh.current) {
      if (!isPressed.value) {
        cursor.value = {
          x: animateValueToZero(cursor.value.x, 0.01),
          y: animateValueToZero(cursor.value.y, 0.01),
        };
      }

      const meshPosition = mesh.current.getPosition();

      if (meshPosition) {
        camera.position.x = Math.sin(-cursor.value.x * Math.PI * 2) * 6;
        camera.position.z = Math.cos(-cursor.value.x * Math.PI * 2) * 6;
        camera.position.y = -cursor.value.y * 10;

        camera.lookAt(meshPosition);
      }
    }
  });

  useEffect(() => {
    const meshPosition = mesh.current?.getPosition();

    if (meshPosition) {
      rectAreaLightRef.current?.lookAt(meshPosition);
    }
  }, []);

  return (
    <>
      {/**
       * Low performance cost
       */}
      {/* <hemisphereLight
        color={new THREE.Color('#ff0000')}
        groundColor={new THREE.Color('#0000ff')}
        intensity={0.3}
        ref={hemisphereLightRef}
      /> */}
      {/* <ambientLight color={new THREE.Color('#ffffff')} intensity={0.3} /> */}
      {/**
       * Moderate performance cost
       */}
      <pointLight
        color={new THREE.Color('#ff9000')}
        intensity={0.5}
        position={[1, -0.5, 1]}
        distance={30}
      />
      {/* <directionalLight
        color={new THREE.Color('#00ffcc')}
        intensity={0.3}
        position={[1, 0.25, 0]}
      /> */}
      {/**
       * Hight performance cost
       */}
      {/* <rectAreaLight
        color={new THREE.Color('#4e00ff')}
        intensity={2}
        position={[-1.5, 0, 1.5]}
        ref={rectAreaLightRef}
      /> */}
      <spotLight
        color={new THREE.Color('#78ff00')}
        intensity={0.5}
        distance={10}
        angle={Math.PI * 0.1}
        penumbra={0.25}
        decay={1}
        position={[0, 2, 3]}
      />

      <Object type="box" position={[1.5, 0, 0]} />
      <Object type="torus" position={[0, 0, 0]} ref={mesh} />
      <Object type="sphere" position={[-1.5, 0, 0]} />
      <Object
        type="plane"
        isAnimationDisabled
        rotation={[-Math.PI * 0.5, 0, 0]}
        position={[0, -0.65, 0]}
        receiveShadow
      />
    </>
  );
};

export default Scene;
