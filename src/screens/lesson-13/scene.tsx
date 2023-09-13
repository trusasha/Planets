import React, {FC} from 'react';
import ShoeOBJ from './shoe';
import DuckGLB from './duck';
import BurgerOBJ from './burger';

const Scene: FC = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[1, 1, 0]} intensity={1} />

      <BurgerOBJ />
      {/* <DuckGLB /> */}
      {/* <ShoeOBJ /> */}
    </>
  );
};

export default Scene;