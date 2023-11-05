import React from 'react';
import useModelLoader from '@hooks/use-model-loader';
import burgerObj from '../assets/models/burger';

const BurgerOBJ = () => {
  const [group] = useModelLoader(burgerObj)

  if (!group) {
    return null;
  }

  return (
    <mesh position={[0, -2, -15]} scale={0.2}>
      <primitive object={group} />
    </mesh>
  );
};

export default BurgerOBJ;
