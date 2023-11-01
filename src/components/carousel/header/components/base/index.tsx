import useModelLoader from '@hooks/use-model-loader';
import React, { useRef } from 'react';
import shuttleObj from '../../assets/shuttle'
import { BufferGeometry, Material, Mesh, NormalBufferAttributes } from 'three';
import { useFrame } from '@react-three/fiber';

const Base = () => {
  const object = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null)

  const [group] = useModelLoader(shuttleObj)

  useFrame(({clock: {elapsedTime}}) => {
    if (object.current) {
      object.current.rotation.y = -Math.PI / 3 + Math.sin(elapsedTime) * 0.1;
      object.current.rotation.x = Math.PI / 5 + Math.sin(elapsedTime * 1.5) * 0.05;
    }
  })

  if (!group) {
    return null;
  }

  return (
    <mesh ref={object} rotation={[Math.PI / 5, -Math.PI / 3 , 0]} position={[0, -1, -3]}>
      <primitive object={group} />
    </mesh>
  );
};

export default Base;
