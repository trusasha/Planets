import React, {FC, useRef} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {TScreenProps} from '../../navigation/constants';
import {Canvas, useFrame} from '@react-three/fiber/native';
import {BufferGeometry, Material, Mesh, NormalBufferAttributes} from 'three';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import * as THREE from 'three';
import animateValueToZero from '../../utils/animate-value-to-zero';
import {TextureLoader} from 'expo-three';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

interface ICube {
  isPressed: SharedValue<boolean>;
  cursor: SharedValue<{
    x: number;
    y: number;
  }>;
}

const Door: FC<ICube> = ({isPressed, cursor}) => {
  const mesh = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null);

  const map = new TextureLoader().load(require('./assets/door/color.jpg'));
  const alpha = new TextureLoader().load(require('./assets/door/alpha.jpg'));
  const displacementMap = new TextureLoader().load(require('./assets/door/height.jpg'));
  const ambientOcclusionTexture = new TextureLoader().load(
    require('./assets/door/ambientOcclusion.jpg')
  );
  const normalTexture = new TextureLoader().load(require('./assets/door/normal.jpg'));
  const metalnessTexture = new TextureLoader().load(require('./assets/door/metalness.jpg'));
  const roughnessTexture = new TextureLoader().load(require('./assets/door/roughness.jpg'));

  map.magFilter = THREE.NearestFilter;

  useFrame(({camera}) => {
    if (mesh.current) {
      if (!isPressed.value) {
        cursor.value = {
          x: animateValueToZero(cursor.value.x, 0.01),
          y: animateValueToZero(cursor.value.y, 0.01),
        };
      }

      camera.position.x = Math.sin(-cursor.value.x * Math.PI * 2) * 2;
      camera.position.z = Math.cos(-cursor.value.x * Math.PI * 2) * 2;
      camera.position.y = -cursor.value.y * 10;

      camera.lookAt(mesh.current.position);
    }
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1]} />
      <meshStandardMaterial
        map={map}
        alphaMap={alpha}
        displacementMap={displacementMap}
        aoMap={ambientOcclusionTexture}
        normalMap={normalTexture}
        metalnessMap={metalnessTexture}
        roughnessMap={roughnessTexture}
        displacementScale={0.5}
      />
    </mesh>
  );
};

const Lesson5: FC<TScreenProps<'Lesson 5'>> = () => {
  const isPressed = useSharedValue(false);
  const cursor = useSharedValue({x: 0, y: 0});

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      cursor.value = {
        x: e.absoluteX / SCREEN_WIDTH - 0.5,
        y: -(e.absoluteY / SCREEN_HEIGHT - 0.5),
      };
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  return (
    <GestureDetector gesture={gesture}>
      <Canvas style={styles.flex}>
        <pointLight position={[2, 3, 4]} />
        <ambientLight />
        <Door isPressed={isPressed} cursor={cursor} />
      </Canvas>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default Lesson5;
