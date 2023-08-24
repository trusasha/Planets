import screens from "../../navigation/constants";

interface ILink {
  name: string;
  description?: string;
  route?: typeof screens[keyof typeof screens];
}

const links: ILink[] = [
  {
    name: 'Урок 1 (введение)',
    description: 'Мы произвели рендер первого нашего трехмерного элемента',
    route: screens.lesson1,
  },
  {
    name: 'Урок 2 (позиционирование)',
    description: 'Мы научились позиционировать трехмерные объекты на сцене, трансформировать и объединять в группы',
    route: screens.lesson2,
  },
  {
    name: 'Урок 3 (анимирование)',
    description: 'Мы научились анимировать трехмерные объекты, а так же настраивать параметры камеры',
    route: screens.lesson3,
  },
  {
    name: 'Урок 4',
  },
  {
    name: 'Урок 5',
  },
  {
    name: 'Урок 6',
  },
];

export default links