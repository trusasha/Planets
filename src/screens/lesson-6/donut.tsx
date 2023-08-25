import { useFrame } from '@react-three/fiber/native';
import React, { useRef } from 'react';
import { BufferGeometry, Material, Mesh, NormalBufferAttributes } from 'three';

const Donut = () => {
  const mesh = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null);

  const scale = Math.random();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y = mesh.current.rotation.y += 0.01;
      mesh.current.rotation.z = mesh.current.rotation.z += 0.01;
    }
  })

  return (
    <mesh
      ref={mesh}
      scale={scale}
      rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
      position={[
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ]}
    >
      <torusBufferGeometry args={[0.3, 0.2, 20, 45]} />
      <meshNormalMaterial />
    </mesh>
  );
};

export default Donut;
