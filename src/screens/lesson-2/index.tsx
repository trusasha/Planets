import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {TScreenProps} from '@navigation/constants';
import {Canvas} from '@react-three/fiber/native';
import Header from '@components/header';

const Lesson2: FC<TScreenProps<'Lesson 2'>> = () => (
  <>
    <Header title="Positioning" />
    <Canvas style={styles.flex}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <group position={[0, 0, -4]} scale={2}>
        <mesh position={[1, 0, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="#FF00FF" />
        </mesh>
        <mesh position={[-1, 0, 0]} rotation={[Math.PI / 4, Math.PI / 2, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="#FFFF00" />
        </mesh>
        <mesh position={[0, 2, 0]} rotation={[Math.PI / 2, Math.PI / 2, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="#00FF00" />
        </mesh>
        <mesh position={[0, -2, 0]} rotation={[Math.PI / 2, Math.PI / 5, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="#FFFFF0" />
        </mesh>
      </group>
      <mesh position={[0, 0, -2]} scale={[1, 2, 2]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#00FFFF" />
      </mesh>
      <axesHelper />
    </Canvas>
  </>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default Lesson2;
