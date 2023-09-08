import React, {FC, useRef} from 'react';
import {useFrame, useThree} from '@react-three/fiber/native';
import {TextureLoader} from 'expo-three';
import * as THREE from 'three';

const count = 20000;

const Cloud: FC = () => {
  const geometry = useRef<THREE.BufferGeometry<THREE.NormalBufferAttributes>>(null);
  const points =
    useRef<
      THREE.Points<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[]
      >
    >(null);

  const map = new TextureLoader().load(require('../assets/textures/5.png'));

  useFrame(({clock}) => {
    /**
     * Rotate animation
     */
    if (points.current) {
      points.current.rotateY(0.001);
    }

    /**
     * Waves animation
     */
    // if (geometry.current) {
    //   const elapsedTime = clock.getElapsedTime();

    //   for (let i = 0; i < count; i++) {
    //     const i3 = i * 3;

    //     const x = geometry.current.attributes.position.array[i3]
    //     geometry.current.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    //   } 

    //   geometry.current.attributes.position.needsUpdate = true;
    // }
  });

  useThree(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random()
    }

    if (geometry.current) {
      geometry.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
  });

  return (
    <>
      <points ref={points}>
        <bufferGeometry ref={geometry} />
        <pointsMaterial
          size={0.1}
          // color={new THREE.Color('#ff88cc')}
          alphaMap={map}
          transparent
          blending={THREE.AdditiveBlending}
          vertexColors
          /**
           * Ways to fix black edges on particles:
           */
          // alphaTest={0.001}
          /** --- */
          // depthTest={false}
          /** --- */
          depthWrite={false}
        />
      </points>
    </>
  );
};

export default Cloud;
