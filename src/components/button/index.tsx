import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';

interface IButton {
  title: string;
  onPress: TouchableOpacityProps['onPress'];
  additionalStyles?: TouchableOpacityProps['style'];
}

const Button: FC<IButton> = ({title, onPress, additionalStyles}) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, additionalStyles]}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Button;
