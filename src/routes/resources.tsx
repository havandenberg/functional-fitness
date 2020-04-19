import React from 'react';
import resourcesImg from 'assets/images/resources.svg';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

const Resources = () => (
  <>
    <l.FlexColumnCentered pt={th.spacing.lg}>
      <l.Img height={th.sizes.lg} mb={th.spacing.md} src={resourcesImg} />
      <ty.H2>Fitness Resources</ty.H2>
    </l.FlexColumnCentered>
  </>
);

export default Resources;
