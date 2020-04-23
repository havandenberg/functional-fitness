import React from 'react';
import styled from '@emotion/styled';
import {
  layoutSet,
  LayoutSetProps,
  opacity,
  OpacityProps,
  spaceSet,
  SpaceSetProps,
  textSet,
  TextSetProps,
  transformSet,
  TransformSetProps,
  transition,
  TransitionProps,
} from 'onno-react';
import { Link } from 'react-router-dom';
import { divPropsSet } from './layout';
import th from './theme';

interface CustomTextProps {
  active?: boolean;
  bold?: boolean;
  center?: boolean;
  italic?: boolean;
  nowrap?: boolean;
}

export type TextProps = SpaceSetProps &
  OpacityProps &
  LayoutSetProps &
  TextSetProps &
  TransformSetProps &
  TransitionProps &
  CustomTextProps;

const customOptions = ({ active, bold, center, italic, nowrap }: CustomTextProps): any => ({
  color: active ? th.colors.brand.primary : undefined,
  fontStyle: italic ? 'italic' : undefined,
  fontWeight: bold ? 'bold' : undefined,
  opacity: active === undefined || active ? 1 : 0.5,
  textAlign: center ? 'center' : undefined,
  whiteSpace: nowrap ? 'nowrap' : undefined,
});

export const textPropsSet = [
  divPropsSet,
  layoutSet,
  opacity,
  spaceSet,
  textSet,
  transformSet,
  transition,
  customOptions,
];

const StyledText = styled.p<TextProps & any>(textPropsSet);
const Text = ({
  children,
  size,
  type = 'p',
  ...rest
}: {
  children: React.ReactNode;
  size?: 'large' | 'small';
  type?: keyof typeof th.textStyles;
} & TextProps &
  React.HTMLAttributes<HTMLParagraphElement>) => {
  const fontSize = size === 'large' ? th.fontSizes.lg : size === 'small' ? th.fontSizes.sm : th.fontSizes.nm;
  return (
    <StyledText {...th.textStyles.common} {...th.textStyles[type]} fontSize={fontSize} {...rest}>
      {children}
    </StyledText>
  );
};

const H1 = styled.h1<TextProps & any>(th.textStyles.h1, textPropsSet);
const H2 = styled.h2<TextProps & any>(th.textStyles.h2, textPropsSet);
const H3 = styled.h3<TextProps & any>(th.textStyles.h3, textPropsSet);

const Label = styled(StyledText)<TextProps & any>(
  {
    color: th.colors.brand.primary,
    fontSize: th.fontSizes.sm,
    textTransform: 'uppercase',
  },
  textPropsSet,
);

export const TextLink = styled(Link)<TextProps & any>(
  { textDecoration: 'none' },
  ({ active }) => {
    const isActive = active === 'true';
    const baseStyles = {
      color: isActive ? th.colors.text.default : th.colors.text.default,
    };
    const hoverStyles = {
      color: isActive ? th.colors.text.default : th.colors.brand.primary,
      textDecoration: isActive ? 'none' : 'underline',
    };
    return {
      ':hover': hoverStyles,
      ':link, :visited': {
        ...baseStyles,
        textDecoration: 'none',
        ':hover': hoverStyles,
      },
      ...baseStyles,
      cursor: isActive ? 'default' : 'pointer',
      fontWeight: isActive ? 'bold' : 500,
    };
  },
  textPropsSet,
);

export default {
  H1,
  H2,
  H3,
  Label,
  Text,
  TextLink,
};
