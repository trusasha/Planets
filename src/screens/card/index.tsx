import Text, {TextType} from '@components/text';
import {TScreenProps, TScreensParams} from '@navigation/constants';
import React, {FC, useCallback} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';
import {ILinkCard} from '@screens/main/links';
import Animated, {FadeIn} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Header from '@components/header';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Card: FC<TScreenProps<'Card'>> = ({
  route: {
    params: {
      card: {title, data},
    },
  },
}) => {
  const {top, bottom} = useSafeAreaInsets();
  const {navigate} = useNavigation<NativeStackNavigationProp<TScreensParams>>();

  const renderItem = useCallback(
    ({name, description, route}: ILinkCard['data'][number], index: number) => (
      <AnimatedTouchableOpacity
        onPress={() => navigate(route)}
        entering={FadeIn.delay(index * 200)}
        style={styles.item}
      >
        <Text style={styles.mb6} type={TextType.subtitle}>
          {name}
        </Text>
        <Text>{description}</Text>
      </AnimatedTouchableOpacity>
    ),
    [title, data]
  );

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.content, {paddingTop: top + 18, paddingBottom: bottom + 20}]}
    >
      <Header isAbsolute={false} />
      <Text style={styles.mb16} type={TextType.title}>
        {title}
      </Text>
      {data.map(renderItem)}
    </ScrollView>
  );
};

export default Card;
