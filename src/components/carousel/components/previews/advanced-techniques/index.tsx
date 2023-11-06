import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import {bottomShader, shader} from './shader';
import {useFrame} from '@react-three/fiber/native';
import colors from '@constants/colors';

const fieldSize = 3;
const numPlanes = 5;

const AdvancedTechniques = () => {
  const planes = useRef([]);
  const [planeGeometries, setPlaneGeometries] = useState([]);

  useEffect(() => {
    setPlaneGeometries(
      new Array(numPlanes).fill('').map(() => {
        const geometry = new THREE.PlaneGeometry(fieldSize, fieldSize * 10, 16, 16 * 10);
        const count = geometry.attributes.position.count;
        const randoms = new Float32Array(count);

        for (let i = 0; i < count; i++) {
          randoms[i] = Math.random();
        }

        geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
        return geometry;
      })
    );
  }, []);

  useFrame(() => {
    for (let i = 0; i < numPlanes; i++) {
      const plane = planes.current[i];

      if (plane) {
        plane.position.y -= 0.01;

        if (plane.position.y < -fieldSize * 5) {
          plane.position.y += fieldSize * 10 * numPlanes;
        }
      }
    }
  });

  return (
    <group position={[0, -10, 1]} scale={4} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh position={[0, 100, 0]} scale={50}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color={'#ffc700'} />
      </mesh>
      {planeGeometries.map((geometry, idx) => (
        <group
          key={idx}
          ref={(ref) => (planes.current[idx] = ref)}
          position={[0, idx * fieldSize * 10 - fieldSize * 5, 1]}
        >
          <mesh key={`top-${idx}`} scale={4} geometry={geometry}>
            <rawShaderMaterial
              transparent
              wireframe
              vertexShader={shader.vertex}
              fragmentShader={shader.fragment}
            />
          </mesh>
          <mesh key={`bottom-${idx}`} scale={4} position={[0, 0, -0.01]} geometry={geometry}>
            <rawShaderMaterial
              transparent
              vertexShader={bottomShader.vertex}
              fragmentShader={bottomShader.fragment}
              uniforms={{color: {value: new THREE.Color(colors.background)}}}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default AdvancedTechniques;
