import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Canvas} from '@react-three/fiber/native';
import Scene from './scene';
import {PerspectiveCamera} from 'three';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const aspectRatio = (SCREEN_WIDTH - 36) / 150;

const BaseTechnics = () => {
  const camera = new PerspectiveCamera(50, aspectRatio);

  return (
    <View style={{flex: 1}}>
      <Canvas shadows style={styles.flex} camera={camera}>
        <Scene />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#141617',
  },
});

export default BaseTechnics;
