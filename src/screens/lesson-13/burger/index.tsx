import React from 'react';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import {useLoader} from '@react-three/fiber/native';

const BurgerOBJ = () => {
  const [material] = useLoader(MTLLoader, [require('../assets/models/burger/burger.mtl')]);
  const [obj] = useLoader(OBJLoader, [require('../assets/models/burger/burger.obj')], (loader) => {
    material.preload();
    loader.setMaterials(material);
  });

  return (
    <mesh>
      <primitive object={obj} />
    </mesh>
  );
};

export default BurgerOBJ;
