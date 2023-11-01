import React, {FC, Suspense, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {TScreenProps} from '@navigation/constants';
import {Canvas} from '@react-three/fiber/native';
import Scene from './scene';
import * as THREE from 'three';
import useControls from 'r3f-native-orbitcontrols';
import ButtonGroup, {IButtonGroupOption} from '@components/button-group';
import Header from '@components/header';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

const options: IButtonGroupOption[] = [
  {
    label: 'Mountains',
    value: 'mountains',
  },
  {
    label: 'Flag',
    value: 'flag',
  },
  {
    label: 'Pink wave',
    value: 'pink-wave',
  },
];

const Lesson14: FC<TScreenProps<'Lesson 14'>> = () => {
  const [OrbitControls, events] = useControls();

  const [currentExample, setCurrentExample] = useState(options[0]);

  const camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 0.1, 100);
  camera.position.set(0.25, -0.25, 1);

  return (
    <>
      <Header title="Shaders" />
      <View style={styles.flex}>
        <View style={styles.flex} {...events}>
          <Suspense fallback={null}>
            <Canvas style={styles.flex} camera={camera}>
              <OrbitControls />
              <Scene selectedExample={currentExample} />
            </Canvas>
          </Suspense>
        </View>
        <ButtonGroup
          additionalStyles={styles.buttonGroup}
          options={options}
          selectedOption={currentExample}
          onSelect={setCurrentExample}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonGroup: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
  },
});

export default Lesson14;
