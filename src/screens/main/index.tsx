import React, {FC} from 'react';
import {SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TScreenProps} from '@navigation/constants';
import links from './links';
import Carousel from '@components/carousel';
import colors from '@constants/colors';
import {LinearGradient} from 'expo-linear-gradient';

const Main: FC<TScreenProps<'Main'>> = ({navigation: {navigate}}) => (
  <View style={styles.container}>
    <LinearGradient
      colors={[colors.background, `${colors.background}01`]}
      style={styles.topGradient}
      start={{x: 0, y: 0.6}}
      end={{x: 0, y: 0.9}}
      pointerEvents='none'
    />
    <Carousel data={links} additionalContainerStyles={styles.carouselContent} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 10,
  },
  carouselContent: {
    paddingTop: 200,
  },
  item: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
    marginBottom: 4,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  content: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 12,
  },
});

export default Main;
