import './fonts.css';
import { DESKTOP, SMALL, TABLET, TABLET_DOWN, TABLET_UP, TINY, hexColorWithTransparency } from './utils';

export const colors = {
  background: '#F6F6F6',
  black: '#4A4A4A',
  lightGray: '#E8E8E8',
  gray: '#979797',
  white: '#FFFFFF',
  brand: {
    primary: '#6A92FF',
    primaryHighlight: '#DAE2F8',
    secondary: '#F45656',
  },
  text: {
    default: '#4A4A4A',
    link: '#6A92FF',
    inv: '#FFFFFF',
  },
  status: {
    success: '#00B67D',
    failure: '#D50000',
  },
  overlay: hexColorWithTransparency('#000000', 0.9),
};

export const gradients = {
  black: `linear-gradient(to bottom, ${colors.gray}, ${colors.black})`,
  primary: `linear-gradient(to bottom, ${colors.brand.primary}, ${colors.brand.primary})`,
};

// Layout
export const heights = {};

export const sizes = {
  fill: '100%',
  icon: '24px',
  xs: '16px',
  sm: '32px',
  md: '48px',
  lg: '64px',
  xl: '96px',
  xxl: '128px',
  xxxl: '256px',
};

export const spacing = {
  tn: '2px',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '32px',
  xl: '64px',
  xxl: '128px',
  xxxl: '256px',
};

export const widths = {
  maxContent: '1024px',
  maxPage: '1440px',
};

// Typography
export const fontFamilies = {
  main: 'Overpass, system-ui, sans-serif',
};

export const fontSizes = {
  sm: '10px',
  nm: '16px',
  lg: '20px',
  h3: '24px',
  h2: '30px',
  h1: '32px',
};

export const fontWeights = {
  light: 400,
  normal: 500,
  semiBold: 600,
  bold: 700,
};

export const lineHeights = { single: 1, heading: 1.25, main: 1.5 };

// Display
export const borders = {
  black: `1px solid ${colors.black}`,
  error: `1px solid ${colors.status.failure}`,
  input: `1px solid ${colors.gray}`,
  primary: `1px solid ${colors.brand.primary}`,
  transparent: '1px solid transparent',
};

export const borderRadii = { circle: '50%', default: 6, input: 2 };

export const shadows = {};

export const breakpoints = [320, 700, 999];

export const breakpointQueries = {
  [DESKTOP]: '@media (min-width: 1000px)',
  [SMALL]: '@media (max-width: 699px)',
  [TABLET]: '@media (min-width: 700px) and (max-width: 999px)',
  [TABLET_DOWN]: '@media (max-width: 999px)',
  [TABLET_UP]: '@media (min-width: 700px)',
  [TINY]: '@media (max-width: 320px)',
};

export const transitions = {
  default: 'all 0.3s ease',
};

export const scrollOptions = {
  duration: 300,
  offset: -100,
  smooth: 'true',
};

export const scrollStyles = (showScrollBar: boolean) => ({
  '::-webkit-scrollbar': {
    height: showScrollBar ? 18 : 0,
    width: showScrollBar ? 18 : 0,
  },
  '::-webkit-scrollbar-button': {
    display: 'none',
    height: 0,
    width: 0,
  },
  '::-webkit-scrollbar-corner': {
    backgroundColor: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    '-webkit-border-radius': 20,
    '-webkit-box-shadow': 'inset -1px -1px 0px rgba(0, 0, 0, 0.15), inset 1px 1px 0px rgba(0, 0, 0, 0.15)',
    backgroundClip: 'padding-box',
    backgroundColor: colors.white,
    border: showScrollBar ? '8px solid rgba(0, 0, 0, 0)' : 0,
    height: showScrollBar ? 4 : 0,
  },
  overflow: 'auto',
});

export const textStyles = {
  h1: {
    fontSize: fontSizes.h1,
    fontWeight: fontWeights.normal,
  },
  h2: {
    fontSize: fontSizes.h2,
    fontWeight: fontWeights.normal,
  },
  h3: {
    fontSize: fontSizes.h3,
    fontWeight: fontWeights.normal,
  },
  p: {
    fontSize: fontSizes.nm,
    fontWeight: fontWeights.normal,
    // textAlign: 'justify',
  },
  caps: {
    textTransform: 'uppercase',
  },
  common: {
    color: colors.text.default,
    margin: 0,
    padding: 0,
    transition: transitions.default,
  },
} as const;

// Global
export const globalStyles = {
  body: {
    background: colors.background,
    fontFamily: fontFamilies.main,
    margin: 0,
    padding: 0,
    ...scrollStyles(true),
  },
  h1: {
    ...textStyles.common,
    ...textStyles.h1,
  },
  h2: {
    ...textStyles.common,
    ...textStyles.h2,
  },
  h3: {
    ...textStyles.common,
    ...textStyles.h3,
  },
  p: {
    ...textStyles.common,
    ...textStyles.p,
  },
};

export const theme = {
  borderRadii,
  borders,
  breakpoints,
  breakpointQueries,
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  globalStyles,
  gradients,
  heights,
  lineHeights,
  scrollOptions,
  scrollStyles,
  shadows,
  sizes,
  spacing,
  textStyles,
  transitions,
  widths,
};

export default theme;
