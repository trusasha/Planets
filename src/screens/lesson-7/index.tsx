import React, {FC, useRef} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {TScreenProps} from '../../navigation/constants';
import {Canvas, useFrame} from '@react-three/fiber/native';
import {BufferGeometry, Material, Mesh, MeshStandardMaterial, NormalBufferAttributes} from 'three';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import * as THREE from 'three';
import animateValueToZero from '../../utils/animate-value-to-zero';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

interface ICube {
  isPressed: SharedValue<boolean>;
  cursor: SharedValue<{
    x: number;
    y: number;
  }>;
}

const Cube: FC<ICube> = ({isPressed, cursor}) => {
  const mesh = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null);
  const material = useRef<MeshStandardMaterial>(null);

  useFrame(({camera}) => {
    if (mesh.current) {
      if (!isPressed.value) {
        cursor.value = {
          x: animateValueToZero(cursor.value.x, 0.01),
          y: animateValueToZero(cursor.value.y, 0.01),
        }
      }

      camera.position.x = Math.sin(-cursor.value.x * Math.PI * 2) * 3;
      camera.position.z = Math.cos(-cursor.value.x * Math.PI * 2) * 3;
      camera.position.y = -cursor.value.y * 10;

      camera.lookAt(mesh.current.position);

      if (material.current) {
        material.current.color = new THREE.Color(isPressed.value ? 'red' : '#FF00FF');
      }
    }
  });

  return (
    <mesh ref={mesh} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      <boxGeometry />
      <meshStandardMaterial color="#FF00FF" ref={material} />
    </mesh>
  );
};

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
    <GestureDetector gesture={gesture}>
      <Canvas style={styles.flex}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Cube isPressed={isPressed} cursor={cursor} />
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

export default Lesson7;
