import React, {FC} from 'react';
import * as THREE from 'three';
import CANNON from 'cannon';

interface IFloor {
  world: CANNON.World;
}

const Floor: FC<IFloor> = ({world}) => {
  const floorShape = new CANNON.Plane();
  const floorBody = new CANNON.Body({
    shape: floorShape,
  });
  floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
  world.addBody(floorBody);

  return (
    <mesh receiveShadow rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color={new THREE.Color('#777777')} metalness={0.3} roughness={0.4} />
    </mesh>
  );
};

export default Floor;
