import {useFrame} from '@react-three/fiber/native';
import {TextureLoader} from 'expo-three';
import React, {useRef} from 'react';
import {DirectionalLight, Group} from 'three';

const Scene = () => {
  const mesh = useRef<Group>(null);
  const light = useRef<DirectionalLight>(null);

  const map = new TextureLoader().load(require('../../assets/textures/mars-diffuse.jpg'));
  const glossiness = new TextureLoader().load(require('../../assets/textures/mars-glossiness.png'));

  light.current?.lookAt(mesh.current?.position);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = mesh.current.rotation.y += 0.001;
    }
  });

  return (
    <group position={[0.4, -0.3, -2.5]} scale={1.4}>
      <directionalLight ref={light} position={[-2, -2, 2]} intensity={1} />
      <group ref={mesh}>
        <mesh scale={1.1}>
          <sphereGeometry args={[1, 50, 50]} />
          <meshStandardMaterial map={map} roughnessMap={glossiness} />
        </mesh>
      </group>
    </group>
  );
};

export default Scene;
