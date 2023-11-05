import React, {FC, useMemo} from 'react';
import {Vector3} from '@react-three/fiber/native';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import fontAsset from '../../assets/fonts/helvetiker_bold.typeface.json';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import {TextureLoader} from 'expo-three';
import useWaveTextAnimation from '@hooks/use-wave-text-animation';

interface IWaveText {
  text: string;
  position?: Vector3;
  delayPerLetter?: number;
  rotationTime?: number;
  restartDelay?: number;
}

/**
 * WaveText is a React functional component that renders animated text in a wave-like pattern.
 * Each letter in the text animates in sequence, rotating on the X-axis, creating a wave effect.
 *
 * @component
 * @param {IWaveText} props - The props for the WaveText component.
 * @param {string} props.text - The string of text to be animated.
 * @param {Vector3} [props.position] - The position of the text in the 3D space.
 * @param {number} [props.delayPerLetter=0.3] - The delay between the start of each letter's animation, in seconds.
 * @param {number} [props.rotationTime=0.75] - The duration of each letter's rotation animation, in seconds.
 * @param {number} [props.restartDelay=5] - The delay before the wave animation restarts, in seconds.
 * @returns The WaveText component renders a group of 3D mesh elements representing each letter with applied wave animation.
 *
 * The component utilizes the `useWaveTextAnimation` hook to handle the animation logic, ensuring
 * each letter rotates in turn and creates a seamless wave effect. The TextGeometry from Three.js
 * is used to create the 3D text geometries, and a matcap texture is applied for a stylistic finish.
 *
 * The positions of the letters are pre-calculated to center the text appropriately in 3D space.
 * The `meshMatcapMaterial` is used to apply the matcap texture to the text, giving it a shiny surface appearance.
 *
 * Example usage:
 * ```jsx
 * <WaveText text="Hello, World!" position={new Vector3(0, 0, 0)} />
 * ```
 */
const WaveText: FC<IWaveText> = ({
  text,
  position,
  delayPerLetter = 0.3,
  rotationTime = 0.75,
  restartDelay = 5,
}) => {
  const font = new FontLoader().parse(fontAsset);
  const matcap = new TextureLoader().load(require('../../assets/textures/matcap.png'));

  const {letterRefs, letterGeometries, letterWidth} = useWaveTextAnimation({
    text,
    delayPerLetter,
    restartDelay,
    rotationTime,
    font,
  });

  /**
   * Align text in the middle
   */
  const middle = letterWidth[letterWidth.length - 1] / 2;

  return (
    <group position={position}>
      {text.split('').map((_, index) => (
        <mesh
          key={index}
          position={[letterWidth[index] - middle, 0, 0]}
          ref={(el) => (letterRefs.current[index] = el)}
          geometry={letterGeometries[index]}
        >
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
      ))}
    </group>
  );
};

export default WaveText;
