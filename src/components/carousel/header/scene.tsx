import {useFrame} from '@react-three/fiber';
import React, {FC} from 'react';
import {SharedValue, interpolate} from 'react-native-reanimated';
import {FULL_SIZE} from '../components/card/styles';
import Background from './components/background';
import Base from './components/base';
import BasicTechniques from './components/basic-techniques';
import AdvancedTechniques from './components/advanced-techniques';

interface IScene {
  scrollX: SharedValue<number>;
}

const Scene: FC<IScene> = ({scrollX}) => {
  useFrame(({camera}) => {
    const value = interpolate(scrollX.value, [0, FULL_SIZE, FULL_SIZE * 2], [0, 1, 2]);
    const cameraValueY = interpolate(scrollX.value, [0, FULL_SIZE, FULL_SIZE * 2], [0, -Math.PI / 2, -Math.PI])
    const cameraValueX = interpolate(scrollX.value, [0, FULL_SIZE, FULL_SIZE * 2], [0, 0, -Math.PI / 2])

    camera.position.set(0, 1 + value * 2, 5);
    camera.rotation.set(cameraValueX, cameraValueY, 0);
  });

  return (
    <>
      <Background />
      <ambientLight intensity={1} />
      <directionalLight position={[1, 1, 0]} intensity={1} />

      {/* <Base />
      <BasicTechniques /> */}
      <AdvancedTechniques />

      {/* <mesh position={[-0.3, 7, 5]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="blue" />
      </mesh> */}
    </>
  );
};

export default Scene;
