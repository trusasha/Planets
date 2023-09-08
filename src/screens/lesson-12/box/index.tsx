import React, {FC, MutableRefObject, memo, useEffect, useRef} from 'react';
import * as THREE from 'three';
import CANNON, {Vec3} from 'cannon';
import {IObject} from '../scene';

interface IBox {
  width: number;
  height: number;
  depth: number;
  world: CANNON.World;
  objectList: MutableRefObject<IObject[]>;
  x: number;
  y: number;
  z: number;
  onCollide?: Function;
}

const Box: FC<IBox> = ({width, height, depth, world, objectList, x, y, z, onCollide}) => {
  const box =
    useRef<
      THREE.Mesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[]
      >
    >(null);

  const shape = new CANNON.Box(new Vec3(width * 0.5, height * 0.5, depth * 0.5));
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
    if (box.current) {
      objectList.current.push({mesh: box.current, body});
    }
  }, []);

  return (
    <mesh position={[x, y, z]} castShadow ref={box}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial metalness={0.3} roughness={0.4} color={new THREE.Color('yellow')} />
    </mesh>
  );
};

export default memo(Box);
