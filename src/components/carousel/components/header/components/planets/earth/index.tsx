import colors from '@constants/colors';
import {useFrame} from '@react-three/fiber/native';
import {TextureLoader} from 'expo-three';
import React, {FC, useRef} from 'react';
import {Group, SpotLight} from 'three';

const Earth: FC = () => {
  const mesh = useRef<Group>(null);
  const light = useRef<SpotLight>(null);

  const map = new TextureLoader().load(require('./assets/textures/earth-diffuse.jpg'));
  const normal = new TextureLoader().load(require('./assets/textures/earth-normal.jpg'));
  const clouds = new TextureLoader().load(require('./assets/textures/earth-clouds.jpg'));
  const illumination = new TextureLoader().load(
    require('./assets/textures/earth-illumination.jpg')
  );
  const glossiness = new TextureLoader().load(
    require('./assets/textures/earth-glossiness.jpg')
  );

  light.current?.lookAt(mesh.current?.position);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = mesh.current.rotation.y += 0.001;
    }
  });

  return (
    <group position={[0, -0.03, 4.7]} scale={0.1}>
      <spotLight
        position={[-0.5, -0.2, 2]}
        color={colors.sun}
        intensity={1}
        distance={100}
        angle={Math.PI / 4}
        penumbra={1}
      />
      <group ref={mesh}>
        <mesh scale={1.1}>
          <sphereGeometry args={[1, 50, 50]} />
          <meshStandardMaterial map={map} normalMap={normal} roughnessMap={glossiness} />
        </mesh>
        <mesh scale={1.11}>
          <sphereGeometry args={[1, 50, 50]} />
          <meshStandardMaterial alphaMap={clouds} transparent color={'white'} />
        </mesh>
        <mesh scale={1.101}>
          <sphereGeometry args={[1, 50, 50]} />
          <meshBasicMaterial alphaMap={illumination} transparent color={'orange'} />
        </mesh>
      </group>
    </group>
  );
};

export default Earth;
