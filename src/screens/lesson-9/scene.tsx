import React, {FC, useRef} from 'react';
import {useThree} from '@react-three/fiber/native';
import * as THREE from 'three';
import House from './house';
import Graves from './graves';
import Floor, {IFloorRef} from './floor';
import Ghosts from './ghosts';

const Scene: FC = () => {
  const mesh = useRef<IFloorRef>(null);

  useThree(({scene}) => {
    scene.fog = new THREE.Fog('#262837', 1, 23);
  });

  return (
    <>
      <ambientLight color={new THREE.Color('#b9d5ff')} intensity={0.12} />
      <directionalLight
        color={new THREE.Color('#b9d5ff')}
        intensity={0.12}
        shadow-mapSize={256}
        castShadow
      />

      <House />
      <Graves />
      <Ghosts />
      <Floor ref={mesh} />
    </>
  );
};

export default Scene;
