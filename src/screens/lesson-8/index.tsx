import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {TScreenProps} from '@navigation/constants';
import {Canvas} from '@react-three/fiber/native';
import {GestureDetector} from 'react-native-gesture-handler';
import Scene from './scene';
import useOrbitControl from '@hooks/use-orbit-control';

const Lesson8: FC<TScreenProps<'Lesson 8'>> = () => {
  const {gesture, moveCamera} = useOrbitControl();

  return (
    <GestureDetector gesture={gesture}>
      <Canvas shadows style={styles.flex}>
        <Scene moveCamera={moveCamera} />
      </Canvas>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default Lesson8;
