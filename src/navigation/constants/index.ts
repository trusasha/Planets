import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ILinkCard } from '@screens/main/links';

const screens = {
  main: 'Main',
  card: 'Card',
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
  lesson11: 'Lesson 11',
  lesson12: 'Lesson 12',
  lesson13: 'Lesson 13',
  lesson14: 'Lesson 14',
  lesson15: 'Lesson 15',
} as const

export type TScreensParams = {
  [screens.main]: undefined;
  [screens.card]: {card: ILinkCard}
  [screens.lesson1]: undefined;
  [screens.lesson2]: undefined;
  [screens.lesson3]: undefined;
  [screens.lesson4]: undefined;
  [screens.lesson5]: undefined;
  [screens.lesson6]: undefined;
  [screens.lesson7]: undefined;
  [screens.lesson8]: undefined;
  [screens.lesson9]: undefined;
  [screens.lesson10]: undefined;
  [screens.lesson11]: undefined;
  [screens.lesson12]: undefined;
  [screens.lesson13]: undefined;
  [screens.lesson14]: undefined;
  [screens.lesson15]: undefined;
}

export type TScreenProps<T extends keyof TScreensParams> = NativeStackScreenProps<
  TScreensParams,
  T
>;

export default screens
