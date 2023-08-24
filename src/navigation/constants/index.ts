import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const screens = {
  main: 'Main',
  lesson1: 'Lesson 1',
  lesson2: 'Lesson 2',
  lesson3: 'Lesson 3',
} as const

export type TScreensParams = {
  'Main': undefined;
  'Lesson 1': undefined;
  'Lesson 2': undefined;
  'Lesson 3': undefined;
}

export type TScreenProps<T extends keyof TScreensParams> = NativeStackScreenProps<
  TScreensParams,
  T
>;

export default screens
