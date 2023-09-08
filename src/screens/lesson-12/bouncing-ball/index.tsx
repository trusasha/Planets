import {useFrame} from '@react-three/fiber/native';
import React, {FC, useRef} from 'react';
import * as THREE from 'three';
import CANNON from 'cannon';

interface IBouncingBall {
  world: CANNON.World;
}

const BouncingBall: FC<IBouncingBall> = ({world}) => {
  const oldElapsedTime = useRef(0);
  const sphere =
    useRef<
      THREE.Mesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[]
      >
    >(null);

  const sphereShape = new CANNON.Sphere(0.5);
  const sphereBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape: sphereShape,
  });
  sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0));
  world.addBody(sphereBody);

  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - oldElapsedTime.current;

    oldElapsedTime.current = elapsedTime;

    sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position);

    world.step(1 / 60, deltaTime, 3);

    sphere.current?.position.set(
      sphereBody.position.x,
      sphereBody.position.y,
      sphereBody.position.z
    );
  });

  return (
    <mesh castShadow position={[0, 0.5, 0]} ref={sphere}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial metalness={0.3} roughness={0.4} color={new THREE.Color('red')} />
    </mesh>
  );
};

export default BouncingBall;
