import React, {useRef} from 'react';
import {useFrame} from '@react-three/fiber/native';
import * as THREE from 'three';
import shader from './shader';

const PinkWave = () => {
  const material = useRef<THREE.RawShaderMaterial>(null);

  useFrame(({invalidate, clock: {elapsedTime}}) => {
    if (material.current) {
      material.current.uniforms.time.value = elapsedTime;
    }

    invalidate();
  });

  return (
    <mesh>
      <planeGeometry args={[1, 1, 10, 10]} />
      <rawShaderMaterial
        ref={material}
        vertexShader={shader.vertex}
        fragmentShader={shader.fragment}
        uniforms={{
          time: {
            value: 0,
          },
        }}
      />
    </mesh>
  );
};

export default PinkWave;
