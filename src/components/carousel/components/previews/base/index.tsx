import useModelLoader from '@hooks/use-model-loader';
import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import shuttleObj from '../../header/assets/shuttle';
import {BufferGeometry, Material, Mesh, NormalBufferAttributes} from 'three';
import {Vector3, useFrame} from '@react-three/fiber/native';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import fontAsset from './assets/fonts/helvetiker_bold.typeface.json';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import {TextureLoader} from 'expo-three';

interface IWaveText {
  text: string;
  position: Vector3;
  delayPerLetter: number;
  rotationTime: number;
  restartDelay: number;
}

const WaveText: FC<IWaveText> = ({text, position, delayPerLetter, rotationTime, restartDelay}) => {
  const font = new FontLoader().parse(fontAsset);
  const matcap = new TextureLoader().load(require('./assets/textures/matcap.png'));

  const meshRefs = useRef([]);

  // Настройка времени начала вращения для каждой буквы
  const rotationStartTimes = text.split('').map((_, index) => index * delayPerLetter);

  const lastLetterFinishTime = useMemo(
    () => rotationStartTimes[rotationStartTimes.length - 1] + rotationTime,
    [rotationStartTimes, rotationTime]
  );
  const nextCycleStartTime = useRef(lastLetterFinishTime + restartDelay);
  const rotationVelocities = useRef(text.split('').map(() => 0));

  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();

    // Проверяем, пришло ли время начать следующий цикл анимации
    if (elapsedTime > nextCycleStartTime.current) {
      // Сброс времени начала вращения для каждой буквы
      for (let i = 0; i < rotationStartTimes.length; i++) {
        rotationStartTimes[i] = elapsedTime + i * delayPerLetter;
      }
      // Сброс времени начала следующего цикла
      nextCycleStartTime.current =
        rotationStartTimes[rotationStartTimes.length - 1] + rotationTime + restartDelay;

      // Обновление refs, чтобы сбросить анимацию
      meshRefs.current.forEach((mesh) => {
        if (mesh) {
          mesh.rotation.x = 0;
        }
      });
    }

    // Функция плавного начала и завершения движения
    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    meshRefs.current.forEach((mesh, index) => {
      if (mesh) {
        const startTime = rotationStartTimes[index];
        const localElapsedTime = elapsedTime - startTime;
        let rotationProgress = localElapsedTime / rotationTime;

        if (rotationProgress >= 0 && rotationProgress < 1) {
          // Применяем функцию плавности для вращения
          const easedProgress = easeInOutCubic(rotationProgress);
          mesh.rotation.x = Math.PI * 2 * easedProgress;
        } else if (rotationProgress >= 1) {
          // Если только что достигли конца вращения, установить скорость затухания
          if (rotationVelocities.current[index] === (Math.PI * 2) / rotationTime) {
            rotationVelocities.current[index] = (Math.PI * 2) / rotationTime;
          }

          // Применяем затухание к скорости, если она ещё не установлена в 0
          if (rotationVelocities.current[index] !== 0) {
            rotationVelocities.current[index] *= 0.95;

            // Добавляем к вращению на основе текущей скорости
            mesh.rotation.x += rotationVelocities.current[index] * (1 / 60); // предполагая 60 кадров в секунду

            // Останавливаем вращение, если скорость достаточно мала
            if (Math.abs(rotationVelocities.current[index]) < 0.001) {
              rotationVelocities.current[index] = 0;
              mesh.rotation.x = Math.PI * 2;
            }
          }
        }

        // Обеспечиваем, что вращение не выходит за пределы 2*PI
        mesh.rotation.x %= Math.PI * 2;
      }
    });
  });

  const letterGeometries = useMemo(() => {
    return text.split('').map((letter) => {
      const geometry = new TextGeometry(letter, {
        font,
        size: 4,
        height: 0.5,
      });
      geometry.computeBoundingBox();
      geometry.center(); // Центрируем геометрию
      return geometry;
    });
  }, [text, font]);

  // Расчет позиций для центрирования текста
  const textWidth = useMemo(() => {
    let totalWidth = 0;
    return letterGeometries.map((geometry) => {
      const letterWidth = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
      totalWidth += letterWidth + 1;
      return totalWidth; // Возвращаем накопленную ширину для позиционирования
    });
  }, [letterGeometries]);

  // Выравнивание текста по центру
  const middle = textWidth[textWidth.length - 1] / 2;

  return (
    <group position={position}>
      {text.split('').map((letter, index) => (
        <mesh
          key={index}
          position={[textWidth[index] - middle, 0, 0]}
          ref={(el) => (meshRefs.current[index] = el)}
          geometry={letterGeometries[index]}
        >
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
      ))}
    </group>
  );
};

const Base = () => {
  const object = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>>(null);

  const [group] = useModelLoader(shuttleObj);

  useFrame(({clock: {elapsedTime}}) => {
    if (object.current) {
      object.current.rotation.y = -Math.PI / 3 + Math.sin(elapsedTime) * 0.1;
      object.current.rotation.x = Math.PI / 5 + Math.sin(elapsedTime * 1.5) * 0.05;
    }
  });

  if (!group) {
    return null;
  }

  return (
    <>
      <ambientLight />
      <WaveText
        text="SHUTTLE"
        position={[-2, 4, -7]}
        delayPerLetter={0.3}
        rotationTime={0.75}
        restartDelay={5}
      />
      <mesh
        ref={object}
        rotation={[Math.PI / 5, -Math.PI / 3, 0]}
        position={[0, -1, -3]}
        scale={1.3}
      >
        <primitive object={group} />
      </mesh>
    </>
  );
};

export default Base;
