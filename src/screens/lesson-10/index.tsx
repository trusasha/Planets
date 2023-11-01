import React, {FC, Suspense} from 'react';
import {StyleSheet, View} from 'react-native';
import {TScreenProps} from '@navigation/constants';
import {Canvas} from '@react-three/fiber/native';
import Scene from './scene';
import useControls from 'r3f-native-orbitcontrols';
import Header from '@components/header';

const Lesson10: FC<TScreenProps<'Lesson 10'>> = () => {
  const [OrbitControls, events] = useControls();

  return (
    <>
      <Header title="Particles" />
      <View style={styles.flex} {...events}>
        <Suspense fallback={null}>
          <Canvas style={styles.flex}>
            <OrbitControls />
            <Scene />
          </Canvas>
        </Suspense>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default Lesson10;
