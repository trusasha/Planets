import React from 'react';
import * as THREE from 'three';
import {Vector3} from '@react-three/fiber/native';

interface IBushes {
  scale: Vector3;
  position: Vector3;
}

const bushesData: IBushes[] = [
  {
    scale: [0.5, 0.5, 0.5],
    position: [0.8, 0.2, 2.2],
  },
  {
    scale: [0.25, 0.25, 0.25],
    position: [1.4, 0.1, 2.1],
  },
  {
    scale: [0.4, 0.4, 0.4],
    position: [-0.8, 0.1, 2.2],
  },
  {
    scale: [0.15, 0.15, 0.15],
    position: [-1, 0.05, 2.6],
  },
];

const Bushes = () => (
  <>
    {bushesData.map(({scale, position}) => (
      <mesh scale={scale} position={position}>
        <sphereBufferGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={new THREE.Color('#89c854')} />
      </mesh>
    ))}
  </>
);

export default Bushes;
