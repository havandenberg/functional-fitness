import {
  BackgroundSetProps,
  BorderSetProps,
  DisplaySetProps,
  FlexSetProps,
  GridSetProps,
  HeightProps,
  LayoutSetProps,
  PositionSetProps,
  SizeProps,
  SpaceSetProps,
  TransformSetProps,
  TransitionProps,
  WidthProps,
  backgroundSet,
  borderSet,
  displaySet,
  flexSet,
  gridSet,
  height,
  layoutSet,
  positionSet,
  size,
  spaceSet,
  transformSet,
  transition,
  width,
} from 'onno-react';
import styled from '@emotion/styled';
import { Link as RouterLink } from 'react-router-dom';
import th from './theme';

interface CustomDivProps {
  alignEnd?: boolean;
  alignStart?: boolean;
  columnOnMobile?: boolean;
  columnReverseOnMobile?: boolean;
  grow?: number;
  inline?: boolean;
  justifyEnd?: boolean;
  justifyStart?: boolean;
  pointer?: boolean;
  relative?: boolean;
  wrap?: boolean;
}
export type DivProps = BackgroundSetProps &
  BorderSetProps &
  DisplaySetProps &
  FlexSetProps &
  GridSetProps &
  LayoutSetProps &
  PositionSetProps &
  SpaceSetProps &
  TransformSetProps &
  CustomDivProps;

const customOptions: (props: CustomDivProps) => any = ({
  alignEnd,
  alignStart,
  columnOnMobile,
  columnReverseOnMobile,
  grow,
  inline,
  justifyEnd,
  justifyStart,
  pointer,
  relative,
  wrap,
}) => ({
  alignItems: alignStart ? 'flex-start' : alignEnd ? 'flex-end' : undefined,
  cursor: pointer ? 'pointer' : undefined,
  display: inline ? 'inline-block' : undefined,
  flexGrow: grow,
  flexWrap: wrap ? 'wrap' : undefined,
  justifyContent: justifyStart ? 'flex-start' : justifyEnd ? 'flex-end' : undefined,
  position: relative ? 'relative' : undefined,
  [th.breakpointQueries.small]:
    columnOnMobile || columnReverseOnMobile
      ? { flexDirection: columnReverseOnMobile ? 'column-reverse' : 'column' }
      : {},
});

export const divPropsSet = [
  backgroundSet,
  borderSet,
  displaySet,
  flexSet,
  gridSet,
  layoutSet,
  spaceSet,
  transformSet,
  positionSet,
  customOptions,
];

const Div = styled.div<DivProps>(divPropsSet);
const Span = styled.span<DivProps>(divPropsSet);

const Flex = styled(Div)<DivProps>({ alignItems: 'center', display: 'flex' }, divPropsSet);
const FlexBetween = styled(Flex)<DivProps>(
  {
    justifyContent: 'space-between',
  },
  divPropsSet,
);
const FlexCentered = styled(Flex)<DivProps>(
  {
    justifyContent: 'center',
  },
  divPropsSet,
);
const FlexColumn = styled(Flex)<DivProps>(
  {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  divPropsSet,
);

const Grid = styled(Div)<DivProps>(
  {
    display: 'grid',
  },
  divPropsSet,
);

export const Anchor = styled.a<DivProps>(
  {
    textDecoration: 'none',
  },
  divPropsSet,
);
export const AreaLink = styled(RouterLink)<DivProps>(
  {
    textDecoration: 'none',
  },
  divPropsSet,
);

export interface ScrollProps {
  showScrollBar?: boolean;
}
const Scroll = styled(Div)<DivProps & ScrollProps & any>(
  ({ showScrollBar = true }: { showScrollBar: boolean }) => ({
    ...th.scrollStyles(showScrollBar),
  }),
  divPropsSet,
);

export type ImgProps = HeightProps & SizeProps & SpaceSetProps & TransitionProps & WidthProps;
const Img = styled.img<ImgProps & any>(height, size, spaceSet, transition, width);

const Primary = styled(Span)<DivProps>(
  {
    color: th.colors.brand.primary,
  },
  divPropsSet,
);

export default {
  Div,
  Flex,
  FlexBetween,
  FlexCentered,
  FlexColumn,
  Grid,
  Primary,
  Img,
  Scroll,
  Span,
};
