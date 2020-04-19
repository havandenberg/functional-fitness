import React from 'react';
import exercisesFImg from 'assets/images/exercises-f.svg';
import exercisesMImg from 'assets/images/exercises-m.svg';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

const Exercises = () => (
  <>
    <l.FlexColumnCentered pt={th.spacing.lg}>
      <l.Img height={th.sizes.lg} mb={th.spacing.md} src={exercisesMImg} />
      <ty.H2>Exercises</ty.H2>
    </l.FlexColumnCentered>
  </>
);

export default Exercises;
