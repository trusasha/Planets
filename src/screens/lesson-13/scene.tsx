import React, {FC} from 'react';
import ShoeOBJ from './shoe';
// import DuckGLB from './duck';
import BurgerOBJ from './burger';
// import Solider from './solider';
// import IcebearGLB from './icebear';

const getExample = (value: string) => {
  switch (value) {
    case 'nike':
      return <ShoeOBJ />;
    // case 'duck':
    //   return <DuckGLB />;
    // case 'bear':
    //   return <IcebearGLB />;
    case 'burger':
      return <BurgerOBJ />;
    // case 'solider':
    //   return <Solider />;
    default:
      return null;
  }
};

interface IScene {
  currentExample: string;
}

const Scene: FC<IScene> = ({currentExample}) => (
  <>
    <ambientLight intensity={1} />
    <directionalLight position={[1, 1, 0]} intensity={1} />

    {getExample(currentExample)}
  </>
);

export default Scene;
