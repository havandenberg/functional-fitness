import React from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import Nav from 'components/nav';
import l from 'ui/layout';
import Link from 'ui/link';
import th from 'ui/theme';
import ty from 'ui/typography';

const Sticky = styled(l.Div)<{ root: boolean }>(
  {
    background: th.colors.background,
    position: 'sticky',
    top: 0,
    width: th.sizes.fill,
    zIndex: 100,
  },
  ({ root }) => ({
    boxShadow: root ? undefined : `0 -6px 15px 0px ${th.colors.black}`,
  }),
);

const Header = () => {
  const { pathname } = useLocation();
  return (
    <Sticky root={pathname === '/'}>
      <Link type="area" to="/" width={th.sizes.fill}>
        <l.FlexColumn bdb={th.borders.input} py={th.spacing.md}>
          <ty.H1>Functional Fitness</ty.H1>
          <ty.Text>For All</ty.Text>
        </l.FlexColumn>
      </Link>
      <Switch>
        <Route exact path="/" component={undefined} />
        <Nav />
      </Switch>
    </Sticky>
  );
};

export default Header;