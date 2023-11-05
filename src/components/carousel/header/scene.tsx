import {useFrame} from '@react-three/fiber';
import React, {FC} from 'react';
import {SharedValue, interpolate} from 'react-native-reanimated';
import {FULL_SIZE} from '../components/card/styles';
import Background from './components/background';
import Earth from './components/planets/earth';
import Jupiter from './components/planets/jupiter';
import Mars from './components/planets/mars';

interface IScene {
  scrollX: SharedValue<number>;
}

const Scene: FC<IScene> = ({scrollX}) => {
  useFrame(({camera}) => {
    const value = interpolate(scrollX.value, [-200, 0, FULL_SIZE, FULL_SIZE * 2, FULL_SIZE * 2 + 200], [4.95, 5, 20, 30, 30.05]);
    const cameraValueY = interpolate(scrollX.value, [0, FULL_SIZE, FULL_SIZE * 2], [0, -Math.PI / 2, -Math.PI])

    camera.position.set(0, 0, value);
    camera.rotation.set(0, cameraValueY, 0);
  });

  return (
    <>
      <Background />

      <Earth />
      <Mars />
      <Jupiter />
    </>
  );
};

export default Scene;
