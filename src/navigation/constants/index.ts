import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const screens = {
  main: 'Main',
  lesson1: 'Lesson 1',
  lesson2: 'Lesson 2',
  lesson3: 'Lesson 3',
  lesson4: 'Lesson 4',
  lesson5: 'Lesson 5',
  lesson6: 'Lesson 6',
  lesson7: 'Lesson 7',
  lesson8: 'Lesson 8',
  lesson9: 'Lesson 9',
  lesson10: 'Lesson 10',
} as const

export type TScreensParams = {
  'Main': undefined;
  'Lesson 1': undefined;
  'Lesson 2': undefined;
  'Lesson 3': undefined;
  'Lesson 4': undefined;
  'Lesson 5': undefined;
  'Lesson 6': undefined;
  'Lesson 7': undefined;
  'Lesson 8': undefined;
  'Lesson 9': undefined;
  'Lesson 10': undefined;
}

export type TScreenProps<T extends keyof TScreensParams> = NativeStackScreenProps<
  TScreensParams,
  T
>;

export default screens
