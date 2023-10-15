import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useFrame} from '@react-three/fiber/native';
import * as THREE from 'three';
import CANNON from 'cannon';
import Floor from './floor';
import Sphere from './sphere';
import Box from './box';
import PhysicsUtils, {IBox, ISphere} from './utils';
import {Audio} from 'expo-av';

export interface IObject {
  mesh: THREE.Mesh<
    THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    THREE.Material | THREE.Material[]
  >;
  body: CANNON.Body;
}

export interface ISceneRef {
  addSphere: () => void;
  clean: () => void;
}

const Scene = forwardRef<ISceneRef>((props, ref) => {
  const oldElapsedTime = useRef(0);
  const objects = useRef<IObject[]>([]);
  const light = useRef<THREE.DirectionalLight>(null);

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [spheres, setSpheres] = useState<(ISphere | IBox)[]>([PhysicsUtils.getRandomSphere()]);

  /**
   * Creating of world
   */
  const world = useMemo(() => new CANNON.World(), []);

  /**
   * Creating of material
   */
  const defaultMaterial = useMemo(() => new CANNON.Material('default'), []);

  const defaultContactMaterial = useMemo(
    () =>
      new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
        friction: 0.1,
        restitution: 0.7,
      }),
    []
  );

  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - oldElapsedTime.current;

    world.step(1 / 60, deltaTime, 3);

    if (objects.current) {
      objects.current.forEach(({mesh, body}) => {
        mesh.position.set(body.position.x, body.position.y, body.position.z);
        mesh.rotation.set(body.quaternion.x, body.quaternion.y, body.quaternion.z);
      });
    }
  });

  useImperativeHandle(ref, () => ({
    addSphere: () => setSpheres((state) => [...state, PhysicsUtils.getRandomObject()]),
    clean: () => {
      setSpheres([]);

      objects.current.forEach(({body}) => {
        world.remove(body);
      });

      objects.current = [];
    },
  }));

  /**
   * @TODO
   * Add collision type. Expo audio for some reason does't work in this case, need to double-check
   */
  // const onCollide: Function = useCallback((collision: any) => {
  //   const impactStrength = collision.contact.getImpactVelocityAlongNormal()

  //   if (impactStrength > 1.5) {
  //     // await sound?.setVolumeAsync(Math.random())
  //     sound?.setPositionAsync(0)
  //     sound?.playAsync()
  //   }
  // }, []);

  const renderItem = useCallback((item: ISphere | IBox, key: number) => {
    const {x, y, z} = item;

    if ('radius' in item) {
      return (
        <Sphere
          radius={item.radius}
          x={x}
          y={y}
          z={z}
          world={world}
          key={key}
          objectList={objects}
          // onCollide={onCollide}
        />
      );
    }

    return (
      <Box
        width={item.width}
        height={item.height}
        depth={item.depth}
        x={x}
        y={y}
        z={z}
        world={world}
        key={key}
        // onCollide={onCollide}
        objectList={objects}
      />
    );
  }, []);

  useEffect(() => {
    world.gravity.set(0, -9.82, 0);
    world.addContactMaterial(defaultContactMaterial);
    world.defaultContactMaterial = defaultContactMaterial;
    world.broadphase = new CANNON.SAPBroadphase(world);
    world.allowSleep = true;

    Audio.Sound.createAsync(require('./assets/sounds/hit.mp3'))
      .then(({sound}) => setSound(sound))
      .catch(console.log);
  }, []);

  return (
    <>
      <directionalLight ref={light} position={[5, 5, 5]} intensity={0.5} castShadow />

      {spheres.map(renderItem)}
      {/* <BouncingBall world={world} /> */}
      <Floor world={world} />
    </>
  );
});

export default memo(Scene);
