import React, {FC, useRef} from 'react';
import {useFrame, useLoader, useThree} from '@react-three/fiber/native';
import * as THREE from 'three';
import { SharedValue } from 'react-native-reanimated';
import { gsap } from 'gsap';
import { Dimensions } from 'react-native';

const objectDistance = 4;

const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

export const CONTENT_HEIGHT = SCREEN_HEIGHT - 100;

interface IScene {
  scrollY: SharedValue<number>
}

const Scene: FC<IScene> = ({scrollY}) => {
  const mesh1 = useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[]>>(null)
  const mesh2 = useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[]>>(null)
  const mesh3 = useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[]>>(null)
  const meshes = [mesh1, mesh2, mesh3]

  const particlesGeometry = useRef<THREE.BufferGeometry<THREE.NormalBufferAttributes>>(null);
  const currentSection = useRef(0);
  const previousTime = useRef(0);

  const [gradientMap] = useLoader(THREE.TextureLoader, [require('./assets/textures/5.jpg')]);
  gradientMap.magFilter = THREE.NearestFilter;

  useFrame(({clock, camera}) => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime.current;
    previousTime.current = elapsedTime;

    const newSection = Math.round(scrollY.value / CONTENT_HEIGHT)

    if (newSection !== currentSection.current) {
      currentSection.current = newSection

      gsap.to(
        meshes[currentSection.current].current?.rotation as gsap.TweenTarget, {
          duration: 1.5,
          ease: 'power2.inOut',
          x: '+=6',
          y: '+=3',
          z: '+=1.5',
        }
      )
    }
    
    camera.position.y = -scrollY.value / CONTENT_HEIGHT * objectDistance;

    for (const mesh of meshes) {
      mesh.current?.rotateX(deltaTime * 0.5)
      mesh.current?.rotateY(deltaTime * -0.5)
    }
  })

  useThree(() => {
    if (particlesGeometry.current) {
      const particlesCount = 10000;
      const positions = new Float32Array(particlesCount * 3);

      for (let i = 0; i< particlesCount; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = objectDistance * 0.4 - Math.random() * objectDistance * meshes.length * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      }

      particlesGeometry.current.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    }
  })

  const material = (
    <meshToonMaterial color={new THREE.Color('#ffeded')} gradientMap={gradientMap} />
  );

  return (
    <>
      <directionalLight position={[1, 1, 0]} intensity={1} />

      <mesh ref={mesh1} position={[0.5, 0, 0]} scale={[0.5, 0.5, 0.5]}>
        <torusGeometry args={[1, 0.4, 16, 60]} />
        {material}
      </mesh>
      <mesh ref={mesh2} position={[-0.5, -objectDistance, 0]} scale={[0.5, 0.5, 0.5]}>
        <coneGeometry args={[1, 2, 32]} />
        {material}
      </mesh>
      <mesh ref={mesh3} position={[0.5, -objectDistance * 2, 0]} scale={[0.5, 0.5, 0.5]}>
        <torusKnotGeometry args={[0.8, 0.35, 100, 16]} />
        {material}
      </mesh>

      <points>
        <bufferGeometry ref={particlesGeometry}/>
        <pointsMaterial color={new THREE.Color('#ffeded')} sizeAttenuation size={0.03}/>
      </points>
    </>
  );
};

export default Scene;
