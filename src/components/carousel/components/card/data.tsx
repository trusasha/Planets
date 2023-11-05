import AdvancedTechniques from '@components/carousel/components/previews/advanced-techniques';
import Base from '@components/carousel/components/previews/base';
import BasicTechniques from '@components/carousel/components/previews/basic-techniques';
import {ILinkCard, LinkCardKey} from '@screens/main/links';
import React from 'react';
import {SharedValue} from 'react-native-reanimated';

const getPreviewByKey = (type: ILinkCard['key'], scrollX: SharedValue<number>, index: number) => {
  switch (type) {
    case LinkCardKey.base:
      return <Base />;
    case LinkCardKey.baseTechnics:
      return <BasicTechniques />;
    // case LinkCardKey.advancedTechnics:
    //   return <AdvancedTechniques />;

    default:
      return null;
  }
};

export default getPreviewByKey;
