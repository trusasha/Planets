import type { NativeScrollEvent, NativeSyntheticEvent, ScrollViewProps } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

interface IScrollParams {
  vertical?: boolean;
}

/**
 * Gives standard tools for creating scroll-based animations
 */
const useScrollAnimation = (
  params?: IScrollParams,
): [SharedValue<number>, (event: NativeSyntheticEvent<NativeScrollEvent>) => void] => {
  const scroll = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((ev) => {
    scroll.value = ev.contentOffset[params?.vertical ? 'y' : 'x'];
  });

  return [scroll, onScroll];
};

export default useScrollAnimation;
