import React, {FC} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {TScreenProps} from '@navigation/constants';
import {Canvas, extend, Object3DNode} from '@react-three/fiber/native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import Text from './text';
import Donut from './donut';

extend({TextGeometry});

declare module '@react-three/fiber' {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

const Lesson6: FC<TScreenProps<'Lesson 6'>> = () => {
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
    <GestureDetector gesture={gesture}>
      <Canvas style={styles.flex}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Text isPressed={isPressed} cursor={cursor} />
        {Array.from({length: 100}).map((_, index) => (
          <Donut key={index} />
        ))}
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

export default Lesson6;
