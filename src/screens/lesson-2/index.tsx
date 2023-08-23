import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {TScreenProps} from '../../navigation/constants';
import {Canvas} from '@react-three/fiber';

const Lesson2: FC<TScreenProps<'Lesson 2'>> = () => (
  <Canvas style={styles.flex}>
    <ambientLight/>
    <pointLight position={[10, 10, 10]} />
    <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      <boxGeometry />
      <meshStandardMaterial color='#FF00FF' />
    </mesh>
  </Canvas>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default Lesson2;
