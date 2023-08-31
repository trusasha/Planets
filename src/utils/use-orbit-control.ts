import { Dimensions } from "react-native";
import { Gesture, PanGesture } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { Camera, Vector3 } from "three";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

export interface IOrbitControl {
  gesture: PanGesture;
  moveCamera: (camera: Camera, meshPosition?: Vector3) => void;
}

/**
 * Simple orbit controller
 */
const useOrbitControl = (zoom = 6): IOrbitControl => {
  const isPressed = useSharedValue(false);
  const cursor = useSharedValue({ x: 0, y: 0 });
  const accumulator = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      cursor.value = {
        x: (e.absoluteX / SCREEN_WIDTH - 0.5) + accumulator.value.x,
        y: -(e.absoluteY / SCREEN_HEIGHT - 0.5) + accumulator.value.y,
      };
    })
    .onFinalize(() => {
      accumulator.value = {
        x: cursor.value.x,
        y: cursor.value.y,
      };

      isPressed.value = false;
    });

  const moveCamera = (camera: Camera, meshPosition?: Vector3) => {
    if (!meshPosition) {
      return;
    }

    camera.position.x = Math.sin(-cursor.value.x * Math.PI * 2) * zoom;
    camera.position.z = Math.cos(-cursor.value.x * Math.PI * 2) * zoom;
    camera.position.y = -cursor.value.y * 10;

    camera.lookAt(meshPosition);
  }

  return { gesture, moveCamera }
}

export default useOrbitControl;