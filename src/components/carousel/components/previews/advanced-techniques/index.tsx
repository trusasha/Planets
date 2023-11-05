import React, {useEffect, useRef, useState} from 'react';
import {BufferGeometry, Material, Mesh, NormalBufferAttributes} from 'three';
import * as THREE from 'three';
import shader from './shader';
import {useFrame} from '@react-three/fiber/native';

const fieldSize = 3;
const numPlanes = 5;

const AdvancedTechniques = () => {
  const planes = useRef([]);
  const [planeGeometries, setPlaneGeometries] = useState([]);

  // Создаём геометрию плоскостей и сохраняем в состоянии
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
        // Двигаем каждую плоскость
        plane.position.y -= 0.05;

        // Проверяем, прошла ли плоскость точку, где её надо переместить в конец
        if (plane.position.y < -fieldSize * 5) {
          plane.position.y += fieldSize * 10 * numPlanes;
        }
      }
    }
  });

  return (
    <group position={[0, -10, 1]} scale={4} rotation={[-Math.PI / 2, 0, 0]}>
      {planeGeometries.map((geometry, idx) => (
        <mesh
          key={idx}
          ref={(ref) => (planes.current[idx] = ref)}
          position={[0, idx * fieldSize * 10 - fieldSize * 5, 1]}
          scale={4}
          geometry={geometry}
        >
          <rawShaderMaterial
            transparent
            wireframe
            vertexShader={shader.vertex}
            fragmentShader={shader.fragment}
          />
        </mesh>
      ))}
      {/* <mesh ref={object}>
        <planeGeometry ref={geometry} args={[fieldSize, fieldSize * 10, 32, 32 * 10]} />
        <rawShaderMaterial
          transparent
          wireframe
          vertexShader={shader.vertex}
          fragmentShader={shader.fragment}
        />
      </mesh> */}
    </group>
  );
};

export default AdvancedTechniques;
