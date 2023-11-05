import React, {FC, Suspense, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {TScreenProps} from '@navigation/constants';
import {Canvas} from '@react-three/fiber/native';
import Scene from './scene';
import * as THREE from 'three';
import Header from '@components/header';
import ButtonGroup, {IButtonGroupOption} from '@components/button-group';

const options: IButtonGroupOption[] = [
  {
    label: 'Nike (.obj)',
    value: 'nike',
  },
  {
    label: 'Burger (.obj)',
    value: 'burger',
  },
  // {
  //   label: 'Duck (.glb)',
  //   value: 'duck',
  // },
  // {
  //   label: 'Bear (.glb)',
  //   value: 'bear',
  // },
];

const {width, height} = Dimensions.get('screen')

const Lesson13: FC<TScreenProps<'Lesson 13'>> = () => {
  const [currentExample, setCurrentExample] = useState(options[0]);

  const camera = useRef(new THREE.PerspectiveCamera(50, width / height))

  return (
    <>
      <Header title="Model import" />
      <View style={styles.flex}>
        <Suspense fallback={null}>
          <Canvas style={styles.flex} camera={camera.current} shadows>
            <Scene currentExample={currentExample.value} />
          </Canvas>
        </Suspense>
      </View>
      <ButtonGroup
        additionalStyles={styles.buttonGroup}
        options={options}
        selectedOption={currentExample}
        onSelect={setCurrentExample}
      />
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

export default Lesson13;
