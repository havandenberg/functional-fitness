import { times } from 'ramda';
import Scroll from 'react-scroll';
import th from './theme';

// Colors

export const hexColorWithTransparency = (hexColor: string, transparency: number) => {
  const alphaHexValue = transparency < 1 ? (transparency * 255).toString(16) : transparency.toString(16);
  return `${hexColor}${alphaHexValue.slice(0, 2)}`;
};

export const statusColors = [
  '#64A338',
  '#8BAD2A',
  '#B2B81C',
  '#D8C20E',
  '#FFCC00',
  '#F7A809',
  '#F08412',
  '#E85F1B',
  '#E03B24',
];
export const getStatusColors = (count?: number) => {
  if (count === undefined) {
    return statusColors;
  }
  let colors: number[] = [];
  if (count === 1) {
    colors = [0];
  }
  if (count === 2) {
    colors = [0, 8];
  }
  if (count === 3) {
    colors = [0, 4, 8];
  }
  if (count === 4) {
    colors = [0, 2, 5, 8];
  }
  if (count === 5) {
    colors = [0, 2, 4, 6, 8];
  }
  if (count === 6) {
    colors = [0, 2, 3, 4, 6, 8];
  }
  if (count === 7) {
    colors = [0, 2, 3, 4, 5, 6, 8];
  }
  if (count === 8) {
    colors = [0, 1, 2, 3, 4, 5, 6, 8];
  }
  if (count === 9) {
    colors = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }
  if (count > 9) {
    const extra: number[] = [];
    times(() => extra.push(8), count - 9);
    colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, ...extra];
  }
  return colors.map((idx) => statusColors[idx]);
};

// Display

const TABLET_BREAKPOINT = 768;
const SMALL_BREAKPOINT = 699;
const TINY_BREAKPOINT = 321;

export const DESKTOP = 'desktop';
export const SMALL = 'small';
export const TABLET = 'tablet';
export const TABLET_DOWN = 'tabletDown';
export const TABLET_UP = 'tabletUp';
export const TINY = 'tiny';

export const isDesktop = () => typeof window !== 'undefined' && window.innerWidth > TABLET_BREAKPOINT;

export const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= TABLET_BREAKPOINT;

export const isSmall = () => typeof window !== 'undefined' && window.innerWidth <= SMALL_BREAKPOINT;

export const isTabletOnly = () =>
  typeof window !== 'undefined' && window.innerWidth <= TABLET_BREAKPOINT && window.innerWidth > SMALL_BREAKPOINT;

export const isTabletUp = () => typeof window !== 'undefined' && window.innerWidth >= SMALL_BREAKPOINT;

export const isTiny = () => typeof window !== 'undefined' && window.innerWidth < TINY_BREAKPOINT;

export const scrollToId = (id: string = 'top', customOptions?: object) =>
  Scroll.scroller.scrollTo(id, {
    ...th.scrollOptions,
    ...customOptions,
  });

// Numbers

export const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export const addIntegerCommaSeparators = (value: string | number) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
