import React from 'react';
import styled from '@emotion/styled';
import * as api from 'api';
import l from 'ui/layout';
import th from 'ui/theme';

const Bar = styled(l.Div)<{ active?: boolean; isRest?: boolean }>(
  {
    ':last-child': {
      marginRight: 0,
    },
    marginRight: th.spacing.tn,
    height: th.spacing.xs,
    transition: th.transitions.default,
  },
  ({ active, isRest }) => ({
    background: active ? th.colors.brand.primary : th.colors.brand.primaryHighlight,
    flex: isRest ? undefined : 1,
    flexBasis: isRest ? th.sizes.icon : undefined,
  }),
);

interface Props {
  activeIndex: number;
  liveExercises: api.LiveExercise[];
}

const ProgressBar = ({ activeIndex, liveExercises }: Props) => (
  <l.Flex bdt={th.borders.input} bg={th.colors.black}>
    {liveExercises.map((exercise, idx) => (
      <Bar active={idx <= activeIndex} isRest={exercise.exerciseId === 'rest'} key={idx} />
    ))}
  </l.Flex>
);

export default ProgressBar;
