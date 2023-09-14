import { IModelLoaderConfig } from "@utils/load-model"

const icebearGlb: IModelLoaderConfig = {
  type: 'glb',
  name: 'icebear',
  model: require('./icebear.glb'),
  textures: [
    {
      name: 'polySurface10_lambert1_0',
      image: require('./lambert1_baseColor.xjpg'),
    },
    {
      name: 'axepCube3_lambert4_0',
      image: require('./lambert4_baseColor.xjpg'),
    },
  ],
  scale: {
    x: 1,
    y: 1,
    z: 1,
  },
  position: {
    x: 0,
    y: 0,
    z: -2,
  },
}

export default icebearGlb