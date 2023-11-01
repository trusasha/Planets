import Text, {TextType} from '@components/text';
import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import colors from '@constants/colors';

interface IHeader {
  title?: string;
  isAbsolute?: boolean;
}

const Header: FC<IHeader> = ({title, isAbsolute = true}) => {
  const {goBack} = useNavigation();
  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.container, isAbsolute && [{top: 18 + top}, styles.containerAbsolute]]}>
      <TouchableOpacity onPress={goBack} style={styles.back}>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={styles.icon}>
          <Path d="M15.5 19L8.5 12L15.5 5" stroke={colors.background} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
      </TouchableOpacity>
      {title && (
        <Text type={TextType.subtitle} style={styles.title}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default Header;
