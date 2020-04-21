import styled from '@emotion/styled';
import { divPropsSet, DivProps } from './layout';
import th from './theme';
import { textPropsSet, TextProps } from './typography';

const defaultStyles = {
  ':disabled': {
    opacity: 0.6,
  },
  borderColor: th.colors.gray,
  borderStyle: 'solid',
  borderWidth: 1,
  borderRadius: th.borderRadii.input,
  color: th.colors.text.default,
  fontSize: th.fontSizes.nm,
  padding: th.spacing.sm,
  transition: th.transitions.default,
};

export const Default = styled.input<DivProps & TextProps & any>(defaultStyles, divPropsSet, textPropsSet);

export default {
  Default,
};
