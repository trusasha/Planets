import React, {FC} from 'react';
import * as THREE from 'three';
import Mountains from './examples/mountains';
import PinkWave from './examples/pink-wave';
import Flag from './examples/flag';
import { IButtonGroupOption } from '@components/button-group';

const getExample = (value: string) => {
  switch (value) {
    case 'mountains': return <Mountains/>;
    case 'flag': return <Flag />;
    case 'pink-wave': return <PinkWave/>;
    default: return null;
  }
}

interface IScene {
  selectedExample: IButtonGroupOption
}

const Scene: FC<IScene> = ({selectedExample}) => {


  return (
    <>
      {getExample(selectedExample?.value)}
      <ambientLight color={new THREE.Color('#ffffff')} intensity={0.3} />
    </>
  );
};

export default Scene;
