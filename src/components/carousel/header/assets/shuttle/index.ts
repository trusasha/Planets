import { IModelLoaderConfig } from "@utils/load-model"

const burgerObj: IModelLoaderConfig = {
  type: 'obj',
  name: 'shuttle',
  model: require('./shuttle.obj'),
  material: require('./shuttle.mtl'),
  textures: [
    {
      name: 'novi_color_body.png',
      image: require('./color.png'),
    },
  ],
}

export default burgerObj