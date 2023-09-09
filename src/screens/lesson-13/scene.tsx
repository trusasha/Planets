import React, {FC} from 'react';
import ShoeOBJ from './shoe';

const Scene: FC = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[1, 1, 0]} intensity={1} />

      {/* <DuckGLB /> */}
      <ShoeOBJ />
    </>
  );
};

export default Scene;
