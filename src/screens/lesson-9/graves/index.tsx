import React from 'react';
import * as THREE from 'three';

const Graves = () => {
  const renderItem = (_: unknown, index: number) => {
    const angle = Math.random() * Math.PI * 2; // Random angle
    const radius = 3 + Math.random() * 6; // Random radius
    const x = Math.cos(angle) * radius; // Get the x position using cosinus
    const z = Math.sin(angle) * radius; // Get the z position using sinus

    return (
      <mesh
        key={index}
        castShadow
        position={[x, 0.3, z]}
        rotation={[0, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4]}
      >
        <boxGeometry args={[0.6, 0.8, 0.2]} />
        <meshStandardMaterial color={new THREE.Color('#b2b6b1')} />
      </mesh>
    );
  };

  return <group>{Array.from({length: 50}).map(renderItem)}</group>;
};

export default Graves;
