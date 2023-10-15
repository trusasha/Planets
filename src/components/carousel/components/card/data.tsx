import AdvancedTechnics from '@components/carousel/previews/advanced-technics';
import Base from '@components/carousel/previews/base';
import BaseTechnics from '@components/carousel/previews/base-technics';
import {ILinkCard, LinkCardKey} from '@screens/main/links';
import React from 'react';
import { SharedValue } from 'react-native-reanimated';

const getPreviewByKey = (type: ILinkCard['key'], scrollX: SharedValue<number>, index: number) => {
  switch (type) {
    case LinkCardKey.base:
      return <Base scrollX={scrollX} index={index} />;
    case LinkCardKey.baseTechnics:
      return <BaseTechnics scrollX={scrollX} index={index} />;
    case LinkCardKey.advancedTechnics:
      return <AdvancedTechnics scrollX={scrollX} index={index} />;

    default:
      return null;
  }
};

export default getPreviewByKey;
