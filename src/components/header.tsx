import React from 'react';
import styled from '@emotion/styled';
import { Route, Switch } from 'react-router-dom';
import Nav from 'components/nav';
import l from 'ui/layout';
import Link from 'ui/link';
import th from 'ui/theme';
import ty from 'ui/typography';

const Sticky = styled(l.Div)({
  background: th.colors.background,
  boxShadow: `0 -6px 15px 0px ${th.colors.black}`,
  position: 'sticky',
  top: 0,
  width: th.sizes.fill,
  zIndex: 100,
});

const Header = () => (
  <Sticky>
    <Link type="area" to="/" width={th.sizes.fill}>
      <l.FlexColumn bdb={th.borders.input} py={th.spacing.md}>
        <ty.H1>Functional Fitness</ty.H1>
        <ty.Text size="large">For All</ty.Text>
      </l.FlexColumn>
    </Link>
    <Switch>
      <Route exact path="/" component={undefined} />
      <Nav />
    </Switch>
  </Sticky>
);

export default Header;
