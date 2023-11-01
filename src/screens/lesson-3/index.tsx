import React, {FC, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {TScreenProps} from '@navigation/constants';
import {Canvas, useFrame, useThree} from '@react-three/fiber/native';
import {BufferGeometry, Material, Mesh, NormalBufferAttributes} from 'three';
import * as THREE from 'three';
import Header from '@components/header';

const Cube = () => {
  const mesh = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null);

  /**
   * You can get access to the underlying three.js camera object through the useThree hook.
   */
  useThree(({camera}) => {
    camera.position.set(1, 1, 5);
    camera.rotation.set(THREE.MathUtils.degToRad(0), 0, 0);
  });

  /**
   * Hook which is used to create an animation loop that updates the
   * properties of the mesh component on every frame. In this case,
   * the rotation of the cube is updated by incrementing the x and y
   * rotation values by 0.01 on each frame. we are accessing and modifying
   * the mesh component properties using the reference that we created using
   * the useRef hook which is mesh.
   */
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      <boxGeometry />
      <meshStandardMaterial color="#FF00FF" />
    </mesh>
  );
};

const Lesson3: FC<TScreenProps<'Lesson 3'>> = () => (
  <>
    <Header title="Animation" />
    <Canvas style={styles.flex}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube />
    </Canvas>
  </>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default Lesson3;
