import React, {FC, Suspense} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TScreenProps} from '@navigation/constants';
import {Canvas} from '@react-three/fiber/native';
import Scene, {CONTENT_HEIGHT} from './scene';
import * as THREE from 'three';
import Animated, {useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

const Lesson11: FC<TScreenProps<'Lesson 11'>> = () => {
  const camera = new THREE.PerspectiveCamera(35, SCREEN_WIDTH / SCREEN_HEIGHT, 0.1, 100);
  camera.position.z = 6;

  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={styles.flex}>
      <View style={styles.background}>
        <Suspense fallback={null}>
          <Canvas style={styles.flex} camera={camera}>
            <Scene scrollY={scrollY} />
          </Canvas>
        </Suspense>
      </View>
      <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16}>
        <View style={styles.content}>
          <Text style={styles.title}>TITLE</Text>
        </View>
        <View style={styles.content}>
          <Text style={[styles.title, styles.titleRight]}>DESCRIPTION</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>CONCLUSION</Text>
        </View>
      </Animated.ScrollView>
    </View>
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
});

export default Lesson11;
