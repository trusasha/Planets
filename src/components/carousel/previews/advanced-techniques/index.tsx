import useModelLoader from '@hooks/use-model-loader';
import React, { useRef } from 'react';
import orvilleObj from '../../header/assets/orville'
import { BufferGeometry, Material, Mesh, NormalBufferAttributes } from 'three';

const AdvancedTechniques = () => {
  const object = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null)

  const [group] = useModelLoader(orvilleObj)

  if (!group) {
    return null;
  }

  return (
    <mesh ref={object} position={[-0.3, 10, 6]} rotation={[Math.PI / 2, -Math.PI / 1.2, 0]}>
      <primitive object={group} />
    </mesh>
  );
};

export default AdvancedTechniques;
