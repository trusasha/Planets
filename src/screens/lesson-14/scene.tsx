import React, {FC} from 'react';
import {useFrame, useThree} from '@react-three/fiber/native';
import * as THREE from 'three';

const Scene: FC = () => {
  return (
    <>
      <ambientLight color={new THREE.Color('#ffffff')} intensity={0.3} />
    </>
  );
};

export default Scene;
