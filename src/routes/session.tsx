import React from 'react';
import scheduleImg from 'assets/images/schedule.svg';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

const Session = () => (
  <>
    <l.FlexColumnCentered pt={th.spacing.lg}>
      <l.Img height={th.sizes.lg} mb={th.spacing.md} src={scheduleImg} />
      <ty.H2>Session Name</ty.H2>
    </l.FlexColumnCentered>
  </>
);

export default Session;
