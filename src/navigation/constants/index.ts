import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const screens = {
  main: 'Main',
  lesson1: 'Lesson 1',
  lesson2: 'Lesson 2',
} as const

export type TScreensParams = {
  'Main': undefined;
  'Lesson 1': undefined;
  'Lesson 2': undefined;
}

export type TScreenProps<T extends keyof TScreensParams> = NativeStackScreenProps<
  TScreensParams,
  T
>;

export default screens
