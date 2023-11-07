import {useFrame} from '@react-three/fiber/native';
import {TextureLoader} from 'expo-three';
import React, {FC, useEffect, useRef} from 'react';
import {Group, SpotLight} from 'three';

const Mars: FC = () => {
  const mesh = useRef<Group>(null);
  const light = useRef<SpotLight>(null);

  const map = new TextureLoader().load(require('./assets/textures/mars-diffuse.jpg'));

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = mesh.current.rotation.y += 0.001;
    }
  });

  useEffect(() => {
    if (mesh.current) {
      light.current.target = mesh.current;
    }
  }, []);

  return (
    <group position={[0.26, -0.02, 20.27]} scale={0.1}>
      <spotLight
        ref={light}
        position={[-2, 0, -1]}
        color="#fffacb"
        intensity={0.3}
        distance={100}
        angle={Math.PI / 4}
        penumbra={1}
        decay={2}
      />
      <group ref={mesh}>
        <mesh scale={1.1}>
          <sphereGeometry args={[1, 50, 50]} />
          <meshStandardMaterial map={map} roughness={1} metalness={0} />
        </mesh>
      </group>
    </group>
  );
};

export default Mars;
