import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {BoxGeometryProps, MeshProps, PlaneGeometryProps, SphereGeometryProps, TorusGeometryProps, useFrame} from '@react-three/fiber/native';
import {BufferGeometry, Material, Mesh, NormalBufferAttributes} from 'three';
import * as THREE from 'three';

export interface IObjectRef {
  getPosition: () => THREE.Vector3 | undefined;
}

interface IObjectSizes {
  'box': BoxGeometryProps['args'];
  'sphere': SphereGeometryProps['args'];
  'torus': TorusGeometryProps['args'];
  'plane': PlaneGeometryProps['args'];
}

interface IObject extends MeshProps {
  type: keyof IObjectSizes;
  sizes?: BoxGeometryProps['args'] | SphereGeometryProps['args'] | TorusGeometryProps['args'] | PlaneGeometryProps['args'];
  isAnimationDisabled?: boolean;
}

const getGeometryByType = (type: IObject['type'], sizes?: IObject['sizes']) => {
  switch (type) {
    case 'box':
      return <boxGeometry args={sizes as IObjectSizes['box'] || [0.75, 0.75, 0.75]} />;
    case 'sphere':
      return <sphereGeometry args={sizes as IObjectSizes['sphere'] || [0.5, 16, 16]} />;
    case 'torus':
      return <torusGeometry args={sizes as IObjectSizes['torus'] || [0.3, 0.2, 16, 32]} />;
    case 'plane':
      return <planeGeometry args={sizes as IObjectSizes['plane'] || [5, 5]} />;
    default:
      return null;
  }
};

const Object = forwardRef<IObjectRef, IObject>(({type, isAnimationDisabled, sizes, ...rest}, ref) => {
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
      {getGeometryByType(type, sizes)}
    </mesh>
  );
});

export default Object;
