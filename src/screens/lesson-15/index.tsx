import React, {FC, Suspense} from 'react';
import {StyleSheet, View} from 'react-native';
import {TScreenProps} from '@navigation/constants';
import {Canvas} from '@react-three/fiber/native';
import Scene from './scene';
import * as THREE from 'three';
import useControls from 'r3f-native-orbitcontrols';

const Lesson15: FC<TScreenProps<'Lesson 15'>> = () => {
  const [OrbitControls, events] = useControls();

  const camera = new THREE.PerspectiveCamera();
  camera.position.set(-2, 1, -2);

  return (
    <View style={styles.flex} {...events}>
      <Suspense fallback={null}>
        <Canvas style={styles.flex} camera={camera} shadows>
          <OrbitControls />
          <Scene />
        </Canvas>
      </Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default Lesson15;
