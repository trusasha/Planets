import React, {FC} from 'react';
import {useFrame, useThree} from '@react-three/fiber/native';
import * as THREE from 'three';
import ParticleSphere from './particles/sphere';
import ParticleCloud from './particles/cloud';

const Scene: FC = () => {
  return (
    <>
      <ambientLight color={new THREE.Color('#ffffff')} intensity={0.3} />
      {/* <ParticleSphere /> */}
      <ParticleCloud />
    </>
  );
};

export default Scene;
