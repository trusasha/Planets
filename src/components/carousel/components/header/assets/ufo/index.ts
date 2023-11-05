import { IModelLoaderConfig } from "@utils/load-model"

const burgerObj: IModelLoaderConfig = {
  type: 'obj',
  name: 'ufo',
  model: require('./ufo.obj'),
  material: require('./ufo.mtl'),
}

export default burgerObj