import screens from "@navigation/constants";

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
        description: 'Произвели рендер первого нашего трехмерного элемента',
        route: screens.lesson1,
      },
      {
        name: 'Урок 2 (позиционирование)',
        description: 'Научились позиционировать трехмерные объекты на сцене, трансформировать и объединять в группы',
        route: screens.lesson2,
      },
      {
        name: 'Урок 3 (анимирование)',
        description: 'Научились анимировать трехмерные объекты, а так же настраивать параметры камеры',
        route: screens.lesson3,
      },
      {
        name: 'Урок 4 (взаимодействие)',
        description: 'Научились взаимодействовать с трехмерными объектами через жесты',
        route: screens.lesson4,
      },
      {
        name: 'Урок 5 (текстуры)',
        description: 'Научились загружать и редактировать текстуры',
        route: screens.lesson5,
      },
      {
        name: 'Урок 6 (трехмерный текст)',
        description: 'Научились создавать трехмерный текст и попробовали новые материалы',
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
        description: 'Попробовали использовать различные источники света',
        route: screens.lesson7,
      },
      {
        name: 'Урок 8 (тени)',
        description: 'Активировали тени и попробовали их настроить',
        route: screens.lesson8,
      },
      {
        name: 'Урок 9 (первая сцена)',
        description: 'Создали первую полноценную 3D сцену из нескольких предметов, повторили позиционирование, добавление текстур и работу со светом',
        route: screens.lesson9,
      },
      {
        name: 'Урок 10 (частицы)',
        description: 'Попробовали работать с частицами, изучили их основные проблемы и их решения',
        route: screens.lesson10,
      },
      {
        name: 'Урок 11 (анимация, основанная на скролле)',
        description: 'Попробовали работать с частицами, изучили их основные проблемы и их решения',
        route: screens.lesson11,
      }
    ]
  },
  {
    title: 'Продвинутые техники',
    key: 'advanced-technics',
    data: [
      {
        name: 'Урок 12 (физика)',
        description: 'Попробовали использовать различные источники света',
        route: screens.lesson12,
      },
      {
        name: 'Урок 13 (импортирование моделей)',
        description: 'Импортировали модели в различных форматах (obj, glb)',
        route: screens.lesson13,
      },
      {
        name: 'Урок 14 (шейдеры)',
        description: 'Попробовали создать свой собственный шейдер',
        route: screens.lesson14,
      },
      {
        name: 'Урок 15 (шейдеры)',
        description: 'Попробовали создать свой собственный шейдер',
        route: screens.lesson15,
      },
    ]
  }
];

export default links