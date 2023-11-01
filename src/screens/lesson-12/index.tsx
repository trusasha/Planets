import React, {FC, Suspense, useCallback, useRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {TScreenProps} from '@navigation/constants';
import {Canvas} from '@react-three/fiber/native';
import Scene, {ISceneRef} from './scene';
import useControls from 'r3f-native-orbitcontrols';
import Button from '@components/button';
import Header from '@components/header';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

export const CONTENT_HEIGHT = SCREEN_HEIGHT - 100;

const Lesson12: FC<TScreenProps<'Lesson 12'>> = () => {
  const [OrbitControls, events] = useControls();

  const scene = useRef<ISceneRef>(null);

  const onAdd = useCallback(() => scene.current?.addSphere(), []);
  const onClean = useCallback(() => scene.current?.clean(), []);

  return (
    <>
      <Header title="Physics" />
      <View style={styles.flex} {...events}>
        <Suspense fallback={null}>
          <Canvas style={styles.flex} shadows>
            <Scene ref={scene} />
            <OrbitControls />
          </Canvas>
        </Suspense>
        <Button
          title="Add object"
          onPress={onAdd}
          additionalStyles={[styles.button, styles.buttonAdd]}
        />
        <Button title="Clean" onPress={onClean} additionalStyles={styles.button} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#1e1a20',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    width: SCREEN_WIDTH,
    height: CONTENT_HEIGHT,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: 'white',
  },
  titleRight: {
    alignSelf: 'flex-end',
  },
  info: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  buttonAdd: {
    bottom: 110,
  },
  button: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 40,
  },
});

export default Lesson12;
