import screens from "../../navigation/constants";

interface ILinkSection {
  title: string;
  key: string;
  data: ILink[];
}

interface ILink {
  name: string;
  description?: string;
  route?: typeof screens[keyof typeof screens];
}

const links: ILinkSection[] = [
  {
    title: 'Основы',
    key: 'base',
    data: [
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
        name: 'Урок 4 (взаимодействие)',
        description: 'Мы научились взаимодействовать с трехмерными объектами через жесты',
        route: screens.lesson4,
      },
      {
        name: 'Урок 5 (текстуры)',
        description: 'Мы научились загружать и редактировать текстуры',
        route: screens.lesson5,
      },
      {
        name: 'Урок 6 (трехмерный текст)',
        description: 'Мы научились создавать трехмерный текст и попробовали новые материалы',
        route: screens.lesson6,
      },
    ]
  },
  {
    title: 'Основные техники',
    key: 'base-technics',
    data: [
      {
        name: 'Урок 7 (источники света)',
        description: 'Мы попробовали использовать различные источники света',
        route: screens.lesson7,
      },
      {
        name: 'Урок 8 (тени)',
        description: 'Мы активировали тени и попробовали их настроить',
        route: screens.lesson8,
      },
      {
        name: 'Урок 9 (первая сцена)',
        description: 'Мы создали первую полноценную 3D сцену из нескольких предметов, повторили позиционирование, добавление текстур и работу со светом',
        route: screens.lesson9,
      },
      {
        name: 'Урок 10 (частицы)',
        description: 'Мы попробовали работать с частицами, изучили их основные проблемы и их решения',
        route: screens.lesson10,
      }
    ]
  }
];

export default links