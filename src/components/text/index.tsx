import colors from '@constants/colors';
import React, {FC} from 'react';
import {Text as RNText, StyleSheet, TextProps} from 'react-native';

export enum TextType {
  title = 'title',
  subtitle = 'subtitle',
  text = 'text',
}

interface IText extends TextProps {
  type?: TextType;
}

const Text: FC<IText> = ({type = TextType.text, style, ...rest}) => <RNText {...rest} style={[styles[type], style]} />;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    color: colors.white,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  text: {
    color: colors.white,
  },
})

export default Text;
