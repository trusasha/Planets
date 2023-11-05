import React from 'react';
import icebearGlb from '../assets/models/icebear';
import useModelLoader from '@hooks/use-model-loader';

const Icebear = () => {
  const [scene] = useModelLoader(icebearGlb)

  if (!scene) {
    return null
  }

  return (
    <group position={[0, 0, -10]} receiveShadow>
      <primitive object={scene} />
    </group>
  );
};

export default Icebear;
