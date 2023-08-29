import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {MeshProps, useFrame} from '@react-three/fiber/native';
import {BufferGeometry, Material, Mesh, NormalBufferAttributes} from 'three';
import * as THREE from 'three';

export interface IObjectRef {
  getPosition: () => THREE.Vector3 | undefined;
}

interface IObject extends MeshProps {
  type: 'box' | 'sphere' | 'torus' | 'plane';
  isAnimationDisabled?: boolean;
}

const getGeometryByType = (type: IObject['type']) => {
  switch (type) {
    case 'box':
      return <boxGeometry args={[0.75, 0.75, 0.75]} />;
    case 'sphere':
      return <sphereGeometry args={[0.5, 16, 16]} />;
    case 'torus':
      return <torusGeometry args={[0.3, 0.2, 16, 32]} />;
    case 'plane':
      return <planeGeometry args={[5, 5]} />;
    default:
      return null;
  }
};

const Object = forwardRef<IObjectRef, IObject>(({type, isAnimationDisabled, ...rest}, ref) => {
  const mesh = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null);

  useFrame(() => {
    if (mesh.current && !isAnimationDisabled) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  useImperativeHandle(ref, () => ({
    getPosition: () => mesh.current?.position,
  }));

  return (
    <mesh ref={mesh} {...rest}>
      <meshStandardMaterial roughness={0.4}/>
      {getGeometryByType(type)}
    </mesh>
  );
});

export default Object;
