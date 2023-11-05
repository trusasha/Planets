import React, {useEffect, useRef} from 'react';
import {BufferGeometry, Material, Mesh, NormalBufferAttributes} from 'three';
import * as THREE from 'three';
import shader from './shader';

const fieldSize = 5;

const AdvancedTechniques = () => {
  const object = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null);

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
  });

  return (
    <group position={[0, -2, 1]} scale={4} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={object}>
      <planeGeometry ref={geometry} args={[fieldSize, fieldSize * 10, 128, 128 * 10]} />
      <rawShaderMaterial
        transparent
        vertexShader={shader.vertex}
        fragmentShader={shader.fragment}
      />
    </mesh>
    </group>
  );
};

export default AdvancedTechniques;
