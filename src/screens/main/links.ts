import screens from "@navigation/constants";

export enum LinkCardKey {
  base = 'base',
  baseTechnics = 'base-technics',
  advancedTechnics = 'advanced-technics',
}

export interface ILinkCard {
  title: string;
  key: LinkCardKey;
  data: ILink[];
}

interface ILink {
  name: string;
  description?: string;
  route?: typeof screens[keyof typeof screens];
}

const links: ILinkCard[] = [
  {
    title: 'Basics',
    key: LinkCardKey.base,
    data: [
      {
        name: '1. Introduction',
        description: 'We rendered our first three-dimensional element',
        route: screens.lesson1,
      },
      {
        name: '2. Positioning',
        description: 'Learned how to position three-dimensional objects on stage, transform and group them together',
        route: screens.lesson2,
      },
      {
        name: '3. Animation',
        description: 'Learned how to animate three-dimensional objects, as well as customize camera settings',
        route: screens.lesson3,
      },
      {
        name: '4. Interaction',
        description: 'Learned to interact with three-dimensional objects through gestures',
        route: screens.lesson4,
      },
      {
        name: '5. Textures',
        description: 'Learned how to load and edit textures',
        route: screens.lesson5,
      },
      {
        name: '6. Three-dimensional text',
        description: 'Learned how to create three-dimensional text and tried new materials',
        route: screens.lesson6,
      },
    ]
  },
  {
    title: 'Basic techniques',
    key: LinkCardKey.baseTechnics,
    data: [
      {
        name: '7. Light sources',
        description: 'Tried using different light sources',
        route: screens.lesson7,
      },
      {
        name: '8. Shadows',
        description: 'Activated the shadows and tried to customize them',
        route: screens.lesson8,
      },
      {
        name: '9. First scene',
        description: 'Created the first full 3D scene of multiple items, repeat positioning, adding textures and working with light',
        route: screens.lesson9,
      },
      {
        name: '10. Particles',
        description: 'Tried working with particles, explored their main problems and their solutions',
        route: screens.lesson10,
      },
      {
        name: '11. Scroll-based animation',
        description: 'Tried to implement animation based on user scrolling',
        route: screens.lesson11,
      }
    ]
  },
  {
    title: 'Advanced techniques',
    key: LinkCardKey.advancedTechnics,
    data: [
      {
        name: '12. Physics',
        description: 'Added physics with CANNON',
        route: screens.lesson12,
      },
      {
        name: '13. Model import',
        description: 'Imported models in various formats (obj, glb)',
        route: screens.lesson13,
      },
      {
        name: '14. Shaders',
        description: 'Tried creating your own shader',
        route: screens.lesson14,
      },
      {
        name: '15. Shaders',
        description: 'Tried creating your own shader',
        route: screens.lesson15,
      },
    ]
  }
];

export default links