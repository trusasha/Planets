import React, {FC, useRef} from 'react';
import {useFrame, useThree} from '@react-three/fiber/native';
import * as THREE from 'three';
import {IOrbitControl} from '../../utils/use-orbit-control';
import House from './house';
import Graves from './graves';
import Floor, {IFloorRef} from './floor';
import Ghosts from './ghosts';

interface IScene {
  moveCamera: IOrbitControl['moveCamera'];
}

const Scene: FC<IScene> = ({moveCamera}) => {
  const mesh = useRef<IFloorRef>(null);

  useFrame(({camera}) => {
    const meshPosition = mesh.current?.getPosition();

    if (meshPosition) {
      moveCamera(camera, meshPosition);
    }
  });

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
