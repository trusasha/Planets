import React, {FC, useEffect, useRef} from 'react';
import * as THREE from 'three';
import shader from './shader';

const Mountains: FC = () => {
  const geometry = useRef<THREE.PlaneGeometry>(null);

  useEffect(() => {
    if (geometry.current) {
      const count = geometry.current.attributes.position.count;
      const randoms = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        randoms[i] = Math.random();
      }

      geometry.current.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
    }
  })

  return (
    <mesh>
      <planeGeometry ref={geometry} args={[1, 1, 64, 64]} />
      <rawShaderMaterial
        transparent
        vertexShader={shader.vertex}
        fragmentShader={shader.fragment}
      />
    </mesh>
  );
};

export default Mountains;
