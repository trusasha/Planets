import {useFrame} from '@react-three/fiber/native';
import React, {FC, useRef} from 'react';
import * as THREE from 'three';
import shader from './shader';
import {TextureLoader} from 'expo-three';

const Flag: FC = () => {
  const material = useRef<THREE.RawShaderMaterial>(null);

  const map = new TextureLoader().load(require('../../assets/textures/polish-flag.jpg'));

  useFrame(({invalidate, clock: {elapsedTime}}) => {
    if (material.current) {
      material.current.uniforms.uTime.value = elapsedTime;
    }

    invalidate();
  });

  return (
    <mesh>
      <planeGeometry args={[1, 1, 64, 64]} />
      <rawShaderMaterial
        transparent
        ref={material}
        vertexShader={shader.vertex}
        fragmentShader={shader.fragment}
        uniforms={{
          uFrequency: {value: new THREE.Vector2(10, 10)},
          uTime: {value: 0},
          uColor: {value: new THREE.Color('orange')},
          uTexture: {value: map},
        }}
      />
    </mesh>
  );
};

export default Flag;
