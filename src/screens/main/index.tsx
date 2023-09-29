import React, {FC} from 'react';
import {SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TScreenProps} from '@navigation/constants';
import links from './links';
import Carousel from '@components/carousel';
import colors from '@constants/colors';

const Main: FC<TScreenProps<'Main'>> = ({navigation: {navigate}}) => (
  <SafeAreaView style={styles.container}>
    <Carousel data={links} additionalContainerStyles={styles.carouselContent} />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
