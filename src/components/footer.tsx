import React from 'react';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

const Footer = () => (
  <l.FlexCentered bdt={th.borders.input} py={th.spacing.sm} width={th.sizes.fill}>
    <ty.Text size="small">Developed by Halsey Vandenberg</ty.Text>
  </l.FlexCentered>
);

export default Footer;
