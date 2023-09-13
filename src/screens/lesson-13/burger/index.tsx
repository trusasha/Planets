import React from 'react';
import useObjLoader from '../../../utils/use-obj-loader';

const BurgerOBJ = () => {
  const [burgerGroup] = useObjLoader(
    require('../assets/models/burger/burger.obj'),
    require('../assets/models/burger/burger.mtl')
  );

  if (!burgerGroup) {
    return null;
  }

  return (
    <mesh>
      <primitive object={burgerGroup} />
    </mesh>
  );
};

export default BurgerOBJ;
