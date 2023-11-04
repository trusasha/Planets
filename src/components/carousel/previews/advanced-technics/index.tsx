import colors from '@constants/colors';
import {useFrame} from '@react-three/fiber/native';
import {TextureLoader} from 'expo-three';
import React, {FC, useEffect, useRef} from 'react';
import {Group, SpotLight} from 'three';

const AdvancedTechnics: FC = () => {
  const mesh = useRef<Group>(null);
  const light = useRef<SpotLight>(null);

  const map = new TextureLoader().load(require('../../assets/textures/jupiter-diffuse.jpg'));

  light.current?.lookAt(mesh.current?.position);

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
    <group position={[-0.02, -0.02, 30.3]} scale={0.1}>
      <spotLight
        ref={light}
        position={[-8, 0, -5]} 
        color={colors.sun}
        intensity={1}
        distance={100}
        angle={Math.PI / 4}
        penumbra={1}
      />
      <group ref={mesh}>
        <mesh scale={1.1}>
          <sphereGeometry args={[1, 50, 50]} />
          <meshStandardMaterial map={map} />
        </mesh>
      </group>
    </group>
  );
};

export default AdvancedTechnics;
