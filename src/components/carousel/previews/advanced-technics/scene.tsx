import {FULL_SIZE} from '@components/carousel/components/card/styles';
import {useFrame} from '@react-three/fiber/native';
import {TextureLoader} from 'expo-three';
import React, {FC, useRef} from 'react';
import {SharedValue, interpolate} from 'react-native-reanimated';
import {DirectionalLight, Group} from 'three';

interface IScene {
  scrollX: SharedValue<number>;
  index: number
}

const Scene: FC<IScene> = ({scrollX, index}) => {
  const mesh = useRef<Group>(null);
  const light = useRef<DirectionalLight>(null);

  const map = new TextureLoader().load(require('../../assets/textures/jupiter-diffuse.jpg'));

  light.current?.lookAt(mesh.current?.position);

  useFrame(() => {
    if (mesh.current) {
      const animate = interpolate(
        scrollX.value,
        [FULL_SIZE * (index - 1), FULL_SIZE * index, FULL_SIZE * (index + 1)],
        [0.001, 0.002, 0.001]
      );

      mesh.current.rotation.y = mesh.current.rotation.y += animate;
    }
  });

  return (
    <group position={[0.4, -0.3, -2.5]} scale={1.4}>
      <directionalLight ref={light} position={[-2, -2, 2]} intensity={1} />
      <group ref={mesh}>
        <mesh scale={1.1}>
          <sphereGeometry args={[1, 50, 50]} />
          <meshStandardMaterial map={map} />
        </mesh>
      </group>
    </group>
  );
};

export default Scene;
