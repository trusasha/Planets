import { IModelLoaderConfig } from "@utils/load-model"

const burgerObj: IModelLoaderConfig = {
  type: 'obj',
  name: 'burger',
  model: require('./burger.obj'),
  material: require('./burger.mtl')
}

export default burgerObj