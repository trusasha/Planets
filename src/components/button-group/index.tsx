import Button from '@components/button';
import React, {FC} from 'react';
import {ScrollView, ScrollViewProps, StyleSheet, View} from 'react-native';

export interface IButtonGroupOption {
  label: string;
  value: string;
}

interface IButtonGroup {
  options: IButtonGroupOption[];
  onSelect: (value: IButtonGroupOption) => void;
  selectedOption?: IButtonGroupOption;
  additionalStyles?: ScrollViewProps['style'];
}

/**
 * Simple selector component
 */
const ButtonGroup: FC<IButtonGroup> = ({options, onSelect, selectedOption, additionalStyles}) => {
  return (
    <ScrollView
      horizontal
      style={additionalStyles}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
      bounces={false}
    >
      {options.map((option) => {
        const isSelected = selectedOption?.value === option.value;

        return (
          <Button
            key={option.value}
            title={option.label}
            onPress={() => onSelect(option)}
            additionalStyles={[styles.button, isSelected && styles.buttonSelected]}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  buttonSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    padding: 8,
  },
});

export default ButtonGroup;
