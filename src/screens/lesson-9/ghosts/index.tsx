import {useFrame, useThree} from '@react-three/fiber/native';
import React, {FC, useRef} from 'react';
import * as THREE from 'three';

interface IGhostData {
  color: string;
  order: 'first' | 'second' | 'third';
}

const ghostsData: IGhostData[] = [
  {
    color: '#ff00ff',
    order: 'first',
  },
  {
    color: '#00ffff',
    order: 'second',
  },
  {
    color: '#ffff00',
    order: 'third',
  },
];

const getCoordinatesByOrder = (
  order: IGhostData['order'],
  time: number
): {x: number; y: number; z: number} | null => {
  switch (order) {
    case 'first': {
      const angle = time * 0.5;

      return {x: Math.cos(angle) * 4, y: Math.sin(time * 3), z: Math.sin(angle) * 4};
    }
    case 'second': {
      const angle = -time * 0.32;

      return {
        x: Math.cos(angle) * 5,
        y: Math.sin(time * 4) + Math.sin(time * 2.5),
        z: Math.sin(angle) * 5,
      };
    }
    case 'third': {
      const angle = -time * 0.18;

      return {
        x: Math.cos(angle) * (7 + Math.sin(time * 0.32)),
        y: Math.sin(time * 4) + Math.sin(time * 2.5),
        z: Math.sin(angle) * (7 + Math.sin(time * 0.5)),
      };
    }

    default:
      return null;
  }
};

const Ghost: FC<{ghost: IGhostData}> = ({ghost: {color, order}}) => {
  const ref = useRef<THREE.PointLight>(null);

  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();

    const coordinates = getCoordinatesByOrder(order, elapsedTime)

    if (coordinates && ref.current) {
      const {x, y, z} = coordinates

      ref.current.position.set(x, y, z)
    }
  });

  useThree(() => {
    if (ref.current) {
      ref.current.shadow.camera.far = 7;
    }
  });

  return <pointLight ref={ref} color={new THREE.Color(color)} intensity={2} distance={3} shadow-mapSize={256} castShadow />;
};

const Ghosts = () => {
  const renderItem = (ghost: IGhostData) => <Ghost ghost={ghost} />;

  return <>{ghostsData.map(renderItem)}</>;
};

export default Ghosts;
