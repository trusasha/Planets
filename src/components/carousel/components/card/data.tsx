import AdvancedTechnics from '@components/carousel/previews/advanced-technics';
import Base from '@components/carousel/previews/base';
import BaseTechnics from '@components/carousel/previews/base-technics';
import {ILinkCard, LinkCardKey} from '@screens/main/links';
import React from 'react';

const getPreviewByKey = (type: ILinkCard['key']) => {
  switch (type) {
    case LinkCardKey.base:
      return <Base />;
    case LinkCardKey.baseTechnics:
      return <BaseTechnics />;
    case LinkCardKey.advancedTechnics:
      return <AdvancedTechnics />;

    default:
      return null;
  }
};

export default getPreviewByKey;
