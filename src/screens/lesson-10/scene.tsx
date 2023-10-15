import React, {FC} from 'react';
import * as THREE from 'three';
import ParticleSphere from './particles/sphere';
import ParticleCloud from './particles/cloud';

const Scene: FC = () => (
  <>
    <ambientLight color={new THREE.Color('#ffffff')} intensity={0.3} />
    {/* <ParticleSphere /> */}
    <ParticleCloud />
  </>
);

export default Scene;
