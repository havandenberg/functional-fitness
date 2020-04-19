import styled from '@emotion/styled';
import { divPropsSet, DivProps } from './layout';
import { textPropsSet, TextProps } from './typography';
import th from './theme';

const defaultStyles = {
  background: th.colors.background,
  border: th.borders.input,
  borderRadius: th.borderRadii.input,
  cursor: 'pointer',
  margin: 0,
  padding: 0,
} as const;

type ButtonSize = 'small' | 'large';

interface ButtonProps {
  active?: boolean;
  size: ButtonSize;
}

export const Default = styled.button<DivProps & TextProps & ButtonProps & any>(
  defaultStyles,
  ({ active, size = 'small' }) => {
    const isLarge = size === 'large';
    return {
      fontSize: isLarge ? th.fontSizes.nm : th.fontSizes.sm,
      opacity: active === undefined || active ? 1 : 0.5,
      padding: isLarge ? th.spacing.md : th.spacing.sm,
    };
  },
  divPropsSet,
  textPropsSet,
);

export default {
  Default,
};
