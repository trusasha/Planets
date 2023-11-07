import useModelLoader from '@hooks/use-model-loader';
import React, { useRef } from 'react';
import ufoObj from './assets/models/ufo';
import { Group } from 'three';
import { useFrame } from '@react-three/fiber/native';
import colors from '@constants/colors';
import RingOfLights from './components/ring-of-lights';

const BasicTechniques = () => {
  const object = useRef<Group>(null);

  const [group] = useModelLoader(ufoObj);

  useFrame(() => {
    if (object.current) {
      object.current.rotation.y = object.current.rotation.y + 0.005;
    }
  });

  if (!group) {
    return null;
  }

  return (
    <group rotation={[Math.PI / 4, 0, 0]}>
      <ambientLight intensity={3} />
      <group ref={object}>
        <mesh position={[-0.2, 2, 0]} scale={0.6} rotation={[Math.PI, 0, 0]}>
          <primitive object={group} />
        </mesh>
        <RingOfLights count={8} radius={2.6} position={[0, 2, 0]} />
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} scale={10}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={colors.lighterBlack} />
      </mesh>
    </group>
  );
};

export default BasicTechniques;
