import React, {FC} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {TScreenProps} from '@navigation/constants';
import {Canvas} from '@react-three/fiber/native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import Scene from './scene';
import Header from '@components/header';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

const Lesson7: FC<TScreenProps<'Lesson 7'>> = () => {
  const isPressed = useSharedValue(false);
  const cursor = useSharedValue({x: 0, y: 0});

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      cursor.value = {
        x: e.absoluteX / SCREEN_WIDTH - 0.5,
        y: -(e.absoluteY / SCREEN_HEIGHT - 0.5),
      };
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  return (
    <>
      <Header title="Light sources" />
      <GestureDetector gesture={gesture}>
        <Canvas style={styles.flex}>
          <Scene isPressed={isPressed} cursor={cursor} />
        </Canvas>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default Lesson7;
