import Text, {TextType} from '@components/text';
import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IHeader {
  title?: string;
  isAbsolute?: boolean;
}

const Header: FC<IHeader> = ({title, isAbsolute = true}) => {
  const {goBack} = useNavigation();
  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.container, isAbsolute && [{top: 18 + top}, styles.containerAbsolute]]}>
      <TouchableOpacity onPress={goBack} style={styles.backIcon} />
      {title && (
        <Text type={TextType.subtitle} style={styles.title}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default Header;
