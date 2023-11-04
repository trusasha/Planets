import { useThree } from "@react-three/fiber/native";
import React, { useRef } from "react";
import * as THREE from 'three';

const count = 40000;

const colorInside = new THREE.Color('#99f6ff');
const colorOutside = new THREE.Color('#fff09a');

const Background = () => {
  const geometry = useRef<THREE.BufferGeometry<THREE.NormalBufferAttributes>>(null);
  const points =
    useRef<
      THREE.Points<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[]
      >
    >(null);

    useThree(() => {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
  
      for (let i = 0; i < count * 3; i++) {
        const i3 = i * 3;

        /**
         * Generate random angles with a uniform distribution on the sphere surface.
         * The cosine operation ensures a uniform distribution of particles.
         */
        const theta = Math.acos(2 * Math.random() - 1);
        const phi = Math.random() * 2 * Math.PI;
        
        /**
         * Calculate the radius depending on the particle index, ensuring it's no less than 20.
         */
        const r = 30 + (20 * (i / count));

        /**
         * Convert from spherical to Cartesian coordinates.
         */
        positions[i3] = r * Math.sin(theta) * Math.cos(phi);
        positions[i3 + 1] = r * Math.sin(theta) * Math.sin(phi);
        positions[i3 + 2] = r * Math.cos(theta);

        /**
         * Interpolate colors between colorInside and colorOutside based on the particle's index.
         */
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, i / count);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }
  
      if (geometry.current) {
        geometry.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      }
    });

    return (
      <group position={[0, 0, 20]}>
        <points ref={points}>
          <bufferGeometry ref={geometry} />
          <pointsMaterial
            size={0.1}
            transparent
            blending={THREE.AdditiveBlending}
            vertexColors
            depthWrite={false}
          />
        </points>
      </group>
    );
}

export default Background