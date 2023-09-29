import React, { FC } from 'react';
import Animated, { SharedValue } from 'react-native-reanimated';
import styles, { FULL_SIZE } from './styles';
import useCardAnimation from '@hooks/use-card-animation';
import { ILinkCard } from '@screens/main/links';
import getPreviewByKey from './data';

interface ICard {
  item: ILinkCard;
  scrollX: SharedValue<number>;
  index: number;
}

const Card: FC<ICard> = ({item: {key}, scrollX, index}) => {
  const imageStyles = useCardAnimation(FULL_SIZE, index, scrollX);

  return (
    <Animated.View style={[styles.container, imageStyles]}>
      {getPreviewByKey(key)}
    </Animated.View>
  );
};

export default Card;
