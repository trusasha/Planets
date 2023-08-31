import React from 'react';
import * as THREE from 'three';
import Door from './door';
import Roof from './roof';
import Walls from './walls';
import Bushes from './bushes';

const House = () => {
  return (
    <group>
      <pointLight
        position={[0, 2.2, 3]}
        color={new THREE.Color('#ff7d46')}
        intensity={2}
        distance={9}
        castShadow
        shadow-mapSize={256}
      />

      <Roof />
      <Walls />
      <Door />
      <Bushes />
    </group>
  );
};

export default House;
