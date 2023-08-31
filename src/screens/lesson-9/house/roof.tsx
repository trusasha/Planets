import React from 'react';
import * as THREE from 'three';

const Roof = () => (
  <mesh position={[0, 3, 0]} rotation={[0, Math.PI / 4, 0]}>
    <coneBufferGeometry args={[3.5, 1, 4]} />
    <meshStandardMaterial color={new THREE.Color('#b35f45')} />
  </mesh>
);

export default Roof;
