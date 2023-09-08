import React, {FC, MutableRefObject, memo, useEffect, useRef} from 'react';
import * as THREE from 'three';
import CANNON from 'cannon';
import {IObject} from '../scene';

interface ISphere {
  radius: number;
  world: CANNON.World;
  objectList: MutableRefObject<IObject[]>;
  x: number;
  y: number;
  z: number;
  onCollide?: Function;
}

const Sphere: FC<ISphere> = ({radius, world, objectList, x, y, z, onCollide}) => {
  const sphere =
    useRef<
      THREE.Mesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[]
      >
    >(null);

  const shape = new CANNON.Sphere(radius);
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(x, y, z),
    shape,
  });

  if (onCollide) {
    body.addEventListener('collide', onCollide);
  }

  world.addBody(body);

  useEffect(() => {
    if (sphere.current) {
      objectList.current.push({mesh: sphere.current, body});
    }
  }, []);

  return (
    <mesh position={[x, y, z]} castShadow ref={sphere}>
      <sphereGeometry args={[radius, 20, 20]} />
      <meshStandardMaterial metalness={0.3} roughness={0.4} color={new THREE.Color('yellow')} />
    </mesh>
  );
};

export default memo(Sphere);
