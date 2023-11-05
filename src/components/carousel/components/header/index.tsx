import React, {FC} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {LinearGradient} from 'expo-linear-gradient';
import colors from '@constants/colors';
import {SharedValue} from 'react-native-reanimated';
import {Canvas} from '@react-three/fiber/native';
import Scene from './scene';

interface IHeader {
  scrollX: SharedValue<number>;
}

const Header: FC<IHeader> = ({scrollX}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[`${colors.background}01`, colors.background]}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        pointerEvents="none"
      />
      <Canvas>
        <Scene scrollX={scrollX} />
      </Canvas>
    </View>
  );
};

export default Header;
