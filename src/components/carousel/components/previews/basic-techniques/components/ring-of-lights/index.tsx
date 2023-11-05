import React from 'react';

type IRingOfSpheres = {
  count: number;
  radius: number;
  position: [number, number, number];
};

const RingOfLights: React.FC<IRingOfSpheres> = ({count, radius, position}) => {
  const spheres = Array.from({length: count}, (_, index) => {
    const angle = (index / count) * Math.PI * 2;
    const x = position[0] + Math.cos(angle) * radius;
    const y = position[1];
    const z = position[2] + Math.sin(angle) * radius;

    return (
      <spotLight
        key={index}
        color={'#00edfc'}
        position={[x, y, z]}
        angle={Math.PI / 10}
        penumbra={1}
        intensity={5}
        castShadow
      />
    );
  });

  return <>{spheres}</>;
};

export default RingOfLights;
