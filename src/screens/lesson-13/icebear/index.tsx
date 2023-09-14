import React from 'react';
import icebearGlb from '../assets/models/icebear';
import useModelLoader from '@hooks/use-model-loader';

const Icebear = () => {
  const [scene] = useModelLoader(icebearGlb)

  if (!scene) {
    return null
  }

  return (
    <mesh scale={[10, 10, 10]} receiveShadow>
      <primitive object={scene} />
    </mesh>
  );
};

export default Icebear;
