import useModelLoader from '@hooks/use-model-loader';
import React, { useRef } from 'react';
import ufoObj from '../../header/assets/ufo'
import { BufferGeometry, Material, Mesh, NormalBufferAttributes } from 'three';
import { useFrame } from '@react-three/fiber';

const BasicTechniques = () => {
  const object = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null)

  const [group] = useModelLoader(ufoObj)

  useFrame(() => {
    if (object.current) {
      object.current.rotation.y = object.current.rotation.y + 0.005;
    }
  })

  if (!group) {
    return null;
  }

  return (
    <mesh ref={object} position={[8, 2.5, 5.7]}>
      <primitive object={group} />
    </mesh>
  );
};

export default BasicTechniques;
