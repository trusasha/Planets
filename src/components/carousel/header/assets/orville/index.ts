import { IModelLoaderConfig } from "@utils/load-model"

const burgerObj: IModelLoaderConfig = {
  type: 'obj',
  name: 'orville',
  model: require('./orville.obj'),
  material: require('./orville.mtl'),
  textures: [
    {
      name: 'Orville(SPExport)_Material_BaseColor.png',
      image: require('./color.png'),
    },
  ],
}

export default burgerObj