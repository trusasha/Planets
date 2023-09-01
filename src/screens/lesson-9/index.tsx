import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {TScreenProps} from '../../navigation/constants';
import {Canvas} from '@react-three/fiber/native';
import Scene from './scene';
import useControls from 'r3f-native-orbitcontrols';
import { PerspectiveCamera } from 'three';

const Lesson9: FC<TScreenProps<'Lesson 9'>> = () => {
  const [OrbitControls, events] = useControls()

  const camera = new PerspectiveCamera()

  camera.position.set(5, 5, 15)

  return (
    <View style={styles.flex} {...events}>
      <Canvas shadows style={styles.flex} camera={camera}>
        <OrbitControls />
        <Scene />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#262837',
  },
});

export default Lesson9;
