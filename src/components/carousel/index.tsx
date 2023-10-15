import React, {FC} from 'react';
import {ListRenderItem, ViewProps} from 'react-native';
import Animated from 'react-native-reanimated';
import styles from './styles';
import useScrollAnimation from '@hooks/use-scroll-animation';
import Card from './components/card';
import {FULL_SIZE} from './components/card/styles';
import {ILinkCard} from '@screens/main/links';
import Header from './header';

interface ICarousel {
  data: ILinkCard[];
  additionalStyles?: ViewProps['style'];
  additionalContainerStyles?: ViewProps['style'];
}

const Carousel: FC<ICarousel> = ({data, additionalStyles, additionalContainerStyles}) => {
  const [scrollX, onScroll] = useScrollAnimation();

  const renderItem: ListRenderItem<ILinkCard> = ({item, index}) => (
    <Card scrollX={scrollX} index={index} item={item} />
  );

  return (
    <>
      <Header scrollX={scrollX} />
      <Animated.FlatList
        data={data}
        style={additionalStyles}
        onScroll={onScroll}
        renderItem={renderItem}
        snapToInterval={FULL_SIZE + 9}
        scrollEventThrottle={16}
        decelerationRate="fast"
        contentContainerStyle={[styles.container, additionalContainerStyles]}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default Carousel;
