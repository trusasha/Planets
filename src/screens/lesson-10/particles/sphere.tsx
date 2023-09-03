import React, {FC, useRef} from 'react';
import {useFrame} from '@react-three/fiber/native';
import * as THREE from 'three';

const Sphere: FC = () => {
  const points = useRef<THREE.Points<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[]>>(null)

  useFrame(() => {
    if (points.current) {
      points.current.rotateY(0.1)
    }
  })

  return (
    <>
      <points ref={points}>
        <sphereGeometry args={[1, 32, 32]} />
        <pointsMaterial size={0.009} />
      </points>
    </>
  );
};

export default Sphere;
