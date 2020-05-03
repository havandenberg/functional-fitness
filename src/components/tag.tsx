import React from 'react';
import styled from '@emotion/styled';
import * as api from 'api';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

const Wrapper = styled(l.Centered)(
  { borderRadius: th.borderRadii.input, transition: th.transitions.default },
  ({ active, color, size, src, toggleTag }: Omit<Props, 'id' | 'text'>) => ({
    background: src ? 'transparent' : color,
    border: src ? 0 : th.borders.input,
    cursor: toggleTag ? 'pointer' : undefined,
    fontSize: size === 'large' ? th.fontSizes.nm : th.fontSizes.sm,
    opacity: active === undefined || active ? 1 : 0.6,
    padding: size === 'large' ? `${th.spacing.sm} ${th.spacing.md}` : `${th.spacing.tn} ${th.spacing.sm}`,
  }),
);

interface Props extends api.Tag {
  active?: boolean;
  size: 'small' | 'large';
  toggleTag?: (id: string) => void;
}

const Tag = ({ active, color, id, text, toggleTag, size = 'large', src }: Props) => (
  <Wrapper
    active={active}
    color={color}
    onClick={toggleTag ? () => toggleTag(id) : undefined}
    pointer={!!toggleTag}
    size={size}
    src={src}
  >
    {src && <l.Img src={src} />}
    <ty.Text nowrap>{text}</ty.Text>
  </Wrapper>
);

export default Tag;
