import styled from '@emotion/styled';
import { divPropsSet, DivProps } from './layout';
import th from './theme';
import { textPropsSet, TextProps } from './typography';

const defaultStyles = {
  ':disabled': {
    opacity: 0.6,
  },
  ':hover': {
    borderColor: th.colors.brand.primary,
    boxShadow: `0 1px 3px 0 ${th.colors.black}`,
  },
  ':focus': {
    borderColor: th.colors.brand.primary,
    color: th.colors.text.default,
  },
  borderColor: th.colors.gray,
  borderStyle: 'solid',
  borderWidth: 1,
  borderRadius: th.borderRadii.input,
  padding: th.spacing.md,
  transition: th.transitions.default,
};

export const Default = styled.input<DivProps & TextProps & any>(defaultStyles, divPropsSet, textPropsSet);

export default {
  Default,
};
