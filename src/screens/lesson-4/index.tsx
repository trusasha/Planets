import React, {FC, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {TScreenProps} from '../../navigation/constants';
import {Canvas, useFrame} from '@react-three/fiber/native';
import {BufferGeometry, Material, Mesh, MeshStandardMaterial, NormalBufferAttributes} from 'three';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import * as THREE from 'three';

interface ICube {
  isPressed: SharedValue<boolean>;
  start: SharedValue<{
    x: number;
    y: number;
  }>;
  offset: SharedValue<{
    x: number;
    y: number;
  }>;
}

const Cube: FC<ICube> = ({isPressed, start, offset}) => {
  const mesh = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null);
  const material = useRef<MeshStandardMaterial>(null);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.z = offset.value.x / 10;
      mesh.current.rotation.x = offset.value.y / 10;
      
      if (material.current) {
        material.current.color = new THREE.Color(isPressed.value ? 'red' : '#FF00FF');
      }
    }
  });

  return (
    <mesh ref={mesh} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      <boxGeometry />
      <meshStandardMaterial color="#FF00FF" ref={material}/>
    </mesh>
  );
};

const Lesson4: FC<TScreenProps<'Lesson 4'>> = () => {
  const isPressed = useSharedValue(false);
  const start = useSharedValue({x: 0, y: 0});
  const offset = useSharedValue({x: 0, y: 0});

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
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
        <Cube isPressed={isPressed} start={start} offset={offset} />
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

export default Lesson4;
