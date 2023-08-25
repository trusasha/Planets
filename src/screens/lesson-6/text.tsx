import React, {FC, useEffect, useRef} from 'react';
import {useFrame, useLoader} from '@react-three/fiber/native';
import {BufferGeometry, Material, Mesh, MeshStandardMaterial, NormalBufferAttributes} from 'three';
import {SharedValue} from 'react-native-reanimated';
import * as THREE from 'three';
import animateValueToZero from '../../utils/animate-value-to-zero';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import fontAsset from './assets/fonts/helvetiker_regular.typeface.json';

interface IText {
  isPressed: SharedValue<boolean>;
  cursor: SharedValue<{
    x: number;
    y: number;
  }>;
}

const Text: FC<IText> = ({isPressed, cursor}) => {
  const mesh = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null);
  const material = useRef<MeshStandardMaterial>(null);
  const textRef = useRef<TextGeometry>(null);

  const font = new FontLoader().parse(fontAsset);

  const [matcap] = useLoader(THREE.TextureLoader, [require('./assets/textures/matcaps/8.png')], undefined, ({loaded, total}) => {
    if (loaded === total) {

    }
  })

  useFrame(({camera}) => {
    if (mesh.current) {
      if (!isPressed.value) {
        cursor.value = {
          x: animateValueToZero(cursor.value.x, 0.01),
          y: animateValueToZero(cursor.value.y, 0.01),
        };
      }

      camera.position.x = Math.sin(-cursor.value.x * Math.PI * 2) * 20;
      camera.position.z = Math.cos(-cursor.value.x * Math.PI * 2) * 20;
      camera.position.y = -cursor.value.y * 10;

      camera.lookAt(mesh.current.position);

      if (material.current) {
        material.current.color = new THREE.Color(isPressed.value ? 'red' : '#FF00FF');
      }
    }
  });

  useEffect(() => {
    textRef.current?.center()
  }, [])

  return (
    <mesh ref={mesh}>
      <textGeometry ref={textRef} args={['hello', {font, size: 5, height: 1}]} />
      <meshMatcapMaterial matcap={matcap} />
      {/* <meshNormalMaterial /> */}
    </mesh>
  );
};

export default Text