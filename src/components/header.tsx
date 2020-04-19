import React from 'react';
import l from 'ui/layout';
import Link from 'ui/link';
import th from 'ui/theme';
import ty from 'ui/typography';

const Header = () => (
  <Link type="area" to="/" width={th.sizes.fill}>
    <l.FlexColumn bdb={th.borders.input} pt={th.spacing.lg}>
      <ty.H1>Functional Fitness</ty.H1>
      <ty.Text mt={`-${th.spacing.sm}`} size="large">
        For All
      </ty.Text>
    </l.FlexColumn>
  </Link>
);

export default Header;
