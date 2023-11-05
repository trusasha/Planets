import { useFrame } from "@react-three/fiber/native";
import { useMemo, useRef } from "react";

interface IUseWaveAnimation {
  text: string;
  delayPerLetter: number;
  rotationTime: number;
  restartDelay: number;
}

/**
 * Smooth start and end motion function
 */
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * This custom hook manages the wave animation for text. It calculates the rotation for each letter in the text
 * to create a wave effect. Letters will rotate in sequence with a delay, a set rotation time, and a defined 
 * pause before restarting the cycle.
 * 
 * @param {IUseWaveAnimation} props The hook accepts an object with text, delayPerLetter, rotationTime, and restartDelay.
 * @returns A ref array to be passed to the mesh components.
 */
const useWaveTextAnimation = ({ text, delayPerLetter, rotationTime, restartDelay }: IUseWaveAnimation) => {
  const meshRefs = useRef([]);

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

      meshRefs.current.forEach((mesh) => {
        if (mesh) {
          mesh.rotation.x = 0;
        }
      });
    }

    meshRefs.current.forEach((mesh, index) => {
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

  return meshRefs
};

export default useWaveTextAnimation