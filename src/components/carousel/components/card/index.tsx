import React, { FC, useCallback } from 'react';
import Animated, { FadeOut, SharedValue } from 'react-native-reanimated';
import styles, { FULL_SIZE } from './styles';
import useCardAnimation from '@hooks/use-card-animation';
import { ILinkCard } from '@screens/main/links';
import getPreviewByKey from './data';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@constants/colors';
import TouchableScale from 'react-native-touchable-scale';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import screens, { TScreensParams } from '@navigation/constants';
import Text, { TextType } from '@components/text';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ICard {
  item: ILinkCard;
  scrollX: SharedValue<number>;
  index: number;
}

const Card: FC<ICard> = ({item, scrollX, index}) => {
  const {key, data, title} = item

  const {navigate} = useNavigation<NativeStackNavigationProp<TScreensParams>>()

  const imageStyles = useCardAnimation(FULL_SIZE, index, scrollX);

  const renderItem = useCallback(
    ({name, description}: ILinkCard['data'][number]) => (
      <Animated.View style={styles.item}>
        <Text style={styles.mb6} type={TextType.subtitle}>{name}</Text>
        <Text>{description}</Text>
      </Animated.View>
    ),
    []
  );

  const onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    navigate(screens.card, {card: item})
  };

  return (
    <TouchableScale onPress={onPress} activeScale={0.95}>
      <Animated.View style={[styles.container, imageStyles]}>
        <View style={styles.preview}>{getPreviewByKey(key, scrollX, index)}</View>
        <LinearGradient
          colors={[`${colors.lighterBlack}10`, colors.lighterBlack]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.15}}
          style={styles.content}
        >
          <Text style={styles.mb16} type={TextType.title}>{title}</Text>
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
