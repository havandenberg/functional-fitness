import React, { CSSProperties } from 'react';
import Dropdown, { DropdownState } from 'react-dropdown-aria';
import th from 'ui/theme';

export const defaultSelectStyles = {
  dropdownWrapper: {
    borderRadius: th.borderRadii.input,
    fontSize: th.fontSizes.md,
    ':hover': {
      border: th.borders.primary,
    },
    ':focus': {
      border: th.borders.primary,
    },
    '> button': {
      background: th.colors.white,
      border: 0,
      ':hover': {
        border: 0,
      },
      ':focus': {
        border: 0,
      },
    },
  },
  optionContainer: {
    background: th.colors.white,
    border: th.borders.black,
    borderRadius: 0,
    padding: 0,
    transform: 'translateY(1px)',
  },
  optionItem: {
    fontFamily: th.fontFamilies.main,
    fontSize: th.fontSizes.md,
    fontWeight: 'bold',
    padding: th.spacing.md,
    ':hover': {
      background: th.colors.gray,
    },
  },
  displayedValue: {
    border: 0,
    color: th.colors.text.default,
    fontFamily: th.fontFamilies.main,
  },
};

const selectStyles = (keepOpen?: boolean) => ({
  DropdownWrapper: (baseStyles: CSSProperties, state: DropdownState) => ({
    ...baseStyles,
    ...defaultSelectStyles.dropdownWrapper,
    border: state.open ? th.borders.primary : th.borders.black,
  }),
  OptionContainer: (baseStyles: CSSProperties, state: DropdownState) => ({
    ...baseStyles,
    ...defaultSelectStyles.optionContainer,
    display: state.open || keepOpen ? 'block' : 'none',
  }),
  OptionItem: (baseStyles: CSSProperties, state: DropdownState, { selected }: any) => ({
    ...baseStyles,
    ...defaultSelectStyles.optionItem,
    backgroundColor: selected ? th.colors.gray : th.colors.white,
    color: selected ? th.colors.brand.primary : th.colors.text.default,
    ':hover': {
      background: th.colors.gray,
      color: selected ? th.colors.brand.primary : th.colors.text.default,
    },
  }),
  DisplayedValue: (baseStyles: CSSProperties) => ({
    ...baseStyles,
    ...defaultSelectStyles.displayedValue,
  }),
});

type DropdownProps = JSX.LibraryManagedAttributes<typeof Dropdown, React.ComponentProps<typeof Dropdown>>;

interface SelectProps {
  keepOpen?: boolean;
}

const Select = ({ keepOpen, ...rest }: DropdownProps & SelectProps) => (
  <Dropdown style={selectStyles(keepOpen)} {...rest} />
);

export default Select;
