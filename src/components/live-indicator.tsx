import React from 'react';
import styled from '@emotion/styled';
import b from 'ui/button';
import th from 'ui/theme';

const Button = styled(b.Primary)<{ live?: boolean }>(
  {
    ':hover': {
      background: th.colors.status.success,
      color: th.colors.white,
    },
    fontSize: th.fontSizes.sm,
    fontWeight: 700,
    padding: th.spacing.xs,
  },
  ({ live }) => ({
    background: live ? th.colors.status.success : th.colors.lightGray,
    color: live ? th.colors.white : th.colors.black,
  }),
);

interface Props {
  live?: boolean;
  onClick?: () => void;
}

const LiveIndicator = ({ live, onClick }: Props) => (
  <Button live={live} onClick={onClick}>
    LIVE
  </Button>
);

export default LiveIndicator;
