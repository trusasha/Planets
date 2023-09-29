import type { SharedValue } from 'react-native-reanimated';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';

/**
 * Returns parameters for creating an animated card effect
 * @param width Expected width of the card
 * @param index Index of card in list
 * @param scrollX Value containing data about the current scroll position
 */
const useCardAnimation = (width: number, index: number, scrollX: SharedValue<number>) =>
  useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scrollX.value,
          [(index - 1) * width, index * width, (index + 1) * width],
          [0.85, 1, 0.85],
        ),
      },
    ],
  }));

export default useCardAnimation;
