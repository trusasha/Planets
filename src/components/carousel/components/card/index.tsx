import React, {FC, useCallback, useState} from 'react';
import Animated, {FadeOut, SharedValue} from 'react-native-reanimated';
import styles, {FULL_SIZE} from './styles';
import useCardAnimation from '@hooks/use-card-animation';
import {ILinkCard} from '@screens/main/links';
import getPreviewByKey from './data';
import {Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import colors from '@constants/colors';
import TouchableScale from 'react-native-touchable-scale';
import * as Haptics from 'expo-haptics';

interface ICard {
  item: ILinkCard;
  scrollX: SharedValue<number>;
  index: number;
}

const Card: FC<ICard> = ({item: {key, data, title}, scrollX, index}) => {
  const imageStyles = useCardAnimation(FULL_SIZE, index, scrollX);

  const renderItem = useCallback(
    ({name, description}: ILinkCard['data'][number]) => (
      <Animated.View style={styles.item}>
        <Text style={styles.itemText}>{name}</Text>
        <Text style={styles.itemDescription}>{description}</Text>
      </Animated.View>
    ),
    []
  );

  const onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <TouchableScale onPress={onPress} activeScale={0.95}>
      <Animated.View style={[styles.container, imageStyles]}>
        <View style={styles.preview}>{getPreviewByKey(key)}</View>
        <LinearGradient
          colors={[`${colors.lighterBlack}10`, colors.lighterBlack]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.15}}
          style={styles.content}
        >
          <Text style={styles.title}>{title}</Text>
          {data.map(renderItem)}
        </LinearGradient>
        <Animated.View style={styles.bottomGradient} exiting={FadeOut}>
          <LinearGradient
            style={styles.flex}
            colors={[`${colors.lighterBlack}10`, colors.lighterBlack]}
          />
        </Animated.View>
      </Animated.View>
    </TouchableScale>
  );
};

export default Card;
