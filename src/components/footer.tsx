import React from 'react';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

const Footer = () => (
  <l.Div
    bdb={th.borders.input}
    bdt={th.borders.input}
    display="flex"
    justifyContent="center"
    mx="auto"
    py={th.spacing.sm}
    width={th.sizes.fill}
  >
    <ty.Text size="small">Developed by Halsey Vandenberg</ty.Text>
  </l.Div>
);

export default Footer;
