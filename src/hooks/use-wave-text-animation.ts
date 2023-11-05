import { useFrame } from "@react-three/fiber/native";
import { useMemo, useRef } from "react";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Font } from "three/examples/jsm/loaders/FontLoader";

interface IUseWaveAnimation {
  text: string;
  delayPerLetter: number;
  rotationTime: number;
  restartDelay: number;
  font: Font;
}

/**
 * Smooth start and end motion function
 */
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * `useWaveTextAnimation` is a custom hook designed to animate text with a wave effect in a 3D scene using Three.js.
 * It controls the rotation of each letter in the provided text to create an animated wave effect.
 * The animation sequence involves rotating each letter successively with a delay and a defined rotation time,
 * followed by a restart delay before the animation cycle repeats.
 *
 * The hook makes use of the `useFrame` hook from `@react-three/fiber/native` to update the rotation
 * in an animation loop, providing smooth and continuous wave-like motion.
 *
 * @param {IUseWaveAnimation} props - An object containing the properties required to configure the animation.
 * @param {string} props.text - The string of text that will be animated.
 * @param {number} props.delayPerLetter - The delay before the start of each letter's rotation, creating the sequential wave effect.
 * @param {number} props.rotationTime - The duration each letter takes to complete one rotation.
 * @param {number} props.restartDelay - The delay before the animation cycle restarts after completing a full wave sequence.
 * @param {Font} props.font - The Three.js font used for the text geometry which is required for calculating letter rotations.
 * @returns {object} - An object containing:
 *   - `letterRefs` (React.MutableRefObject[]): A reference array pointing to each letter mesh in the text.
 *   - `letterGeometries` (TextGeometry[]): Pre-calculated text geometries for each letter for optimization purposes.
 *   - `letterWidth` (number[]): The computed width for each letter to help in aligning the text in the center.
 *
 * The hook encapsulates the complex logic for animating text in a wave pattern, ensuring ease of use
 * in a 3D React environment. It manages the lifecycle of the animation, from calculating geometries and
 * initial positions to updating rotations on each frame, and ensures the animation runs optimally by
 * reducing unnecessary computations through memoization and useRef hooks.
 */
const useWaveTextAnimation = ({ text, delayPerLetter, rotationTime, restartDelay, font }: IUseWaveAnimation) => {
  const letterRefs = useRef([]);

  /**
   * Setup the start times for each letter rotation
   */
  const rotationStartTimes = text.split('').map((_, index) => index * delayPerLetter);

  const lastLetterFinishTime = useMemo(
    () => rotationStartTimes[rotationStartTimes.length - 1] + rotationTime,
    [rotationStartTimes, rotationTime]
  );

  /**
   * Define the time for the next cycle to start
   */
  const nextCycleStartTime = useRef(lastLetterFinishTime + restartDelay);

  /**
   * Rotation velocities of each letter
   */
  const rotationVelocities = useRef(text.split('').map(() => 0));

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    /**
     * Check if it's time to start the next animation cycle
     */
    if (elapsedTime > nextCycleStartTime.current) {
      /**
       * Reset the start time for each letter rotation
       */
      for (let i = 0; i < rotationStartTimes.length; i++) {
        rotationStartTimes[i] = elapsedTime + i * delayPerLetter;
      }
      /**
       * Reset the time for the next cycle to start
       */
      nextCycleStartTime.current =
        rotationStartTimes[rotationStartTimes.length - 1] + rotationTime + restartDelay;

      letterRefs.current.forEach((mesh) => {
        if (mesh) {
          mesh.rotation.x = 0;
        }
      });
    }

    letterRefs.current.forEach((mesh, index) => {
      if (mesh) {
        const startTime = rotationStartTimes[index];
        const localElapsedTime = elapsedTime - startTime;
        let rotationProgress = localElapsedTime / rotationTime;

        if (rotationProgress >= 0 && rotationProgress < 1) {
          const easedProgress = easeInOutCubic(rotationProgress);

          /**
           * Set the rotation based on eased progress
           */
          mesh.rotation.x = Math.PI * 2 * easedProgress;
        } else if (rotationProgress >= 1) {
          /**
           * If the end of the rotation was just reached, set the deceleration speed
           */
          if (rotationVelocities.current[index] === (Math.PI * 2) / rotationTime) {
            rotationVelocities.current[index] = (Math.PI * 2) / rotationTime;
          }

          /**
           * Apply deceleration to the speed, if it's not already set to 0
           */
          if (rotationVelocities.current[index] !== 0) {
            rotationVelocities.current[index] *= 0.95;

            /**
             * Add to the rotation based on the current speed
             */
            mesh.rotation.x += rotationVelocities.current[index] * (1 / 60); // предполагая 60 кадров в секунду

            /**
             * Stop the rotation if the speed is sufficiently low
             */
            if (Math.abs(rotationVelocities.current[index]) < 0.001) {
              rotationVelocities.current[index] = 0;
              mesh.rotation.x = Math.PI * 2;
            }
          }
        }

        /**
         * Ensure that the rotation does not exceed 2*PI
         */
        mesh.rotation.x %= Math.PI * 2;
      }
    });
  });

  /**
 * Pre-calculate letter geometries and positions for optimization
 */
  const letterGeometries = useMemo(() => {
    return text.split('').map((letter) => {
      const geometry = new TextGeometry(letter, {
        font,
        size: 4,
        height: 0.5,
      });
      geometry.computeBoundingBox();
      geometry.center();
      return geometry;
    });
  }, [text, font]);

  /**
* Calculate positions to center the text
*/
  const letterWidth = useMemo(() => {
    let totalWidth = 0;
    return letterGeometries.map((geometry) => {
      const letterWidth = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
      totalWidth += letterWidth + 1;
      return totalWidth;
    });
  }, [letterGeometries]);

  return { letterRefs, letterGeometries, letterWidth }
};

export default useWaveTextAnimation