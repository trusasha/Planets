import {useFrame} from '@react-three/fiber/native';
import React, {useRef} from 'react';
import {BufferGeometry, Material, Mesh, NormalBufferAttributes} from 'three';

const Scene = () => {
  const mesh = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.z += 0.01;
    }
  });

  return (
    <group position={[0, 0, -2.5]}>
      <ambientLight />
      <mesh ref={mesh} scale={0.8} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <sphereGeometry />
        <meshStandardMaterial wireframe color="orange" />
      </mesh>
      <mesh scale={15} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <meshStandardMaterial wireframe color="#FF00FF" />
      </mesh>
    </group>
  );
};

export default Scene;
