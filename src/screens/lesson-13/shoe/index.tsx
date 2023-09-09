import React, { useLayoutEffect } from 'react';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import {useLoader} from '@react-three/fiber/native';
import {TextureLoader} from 'expo-three';

const ShoeOBJ = () => {
  const map = new TextureLoader().load(require('../assets/models/airmax/textures/BaseColor.jpg'));
  const normal = new TextureLoader().load(require('../assets/models/airmax/textures/Normal.jpg'));
  const roughness = new TextureLoader().load(
    require('../assets/models/airmax/textures/Roughness.png')
  );

  const [material] = useLoader(MTLLoader, [require('../assets/models/airmax/shoe.mtl')]);
  const [obj] = useLoader(OBJLoader, [require('../assets/models/airmax/shoe.obj')], (loader) => {
    material.preload();
    loader.setMaterials(material);
  });

  useLayoutEffect(() => {
    obj.children[0].material.map = map
    obj.children[0].material.normalMap = normal
    obj.children[0].material.roughnessMap = roughness
  }, [])

  return (
    <mesh scale={10}>
      <primitive object={obj} />
    </mesh>
  );
};

export default ShoeOBJ;
