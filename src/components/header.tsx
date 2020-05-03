import React from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import * as api from 'api';
import LiveIndicator from 'components/live-indicator';
import Nav from 'components/nav';
import l from 'ui/layout';
import Link from 'ui/link';
import th from 'ui/theme';
import ty from 'ui/typography';

export const Sticky = styled(l.Div)<{ root?: boolean }>(
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
  const root = pathname === '/';
  const [liveSessions] = api.useFetchLiveSessions();
  const activeLiveSessions = liveSessions && liveSessions.filter((liveSession) => liveSession.isLive);
  return (
    <Sticky root={root}>
      <Link type="area" to="/" width={th.sizes.fill}>
        <l.FlexColumn
          bdb={th.borders.input}
          boxShadow={root ? `0 -6px 15px 0px ${th.colors.black}` : undefined}
          py={root ? th.spacing.md : th.spacing.sm}
        >
          <ty.H1 fontSize={root ? undefined : th.fontSizes.h3}>Functional Fitness{root ? undefined : ' For All'}</ty.H1>
          {root && <ty.Text fontSize={th.fontSizes.lg}>For All</ty.Text>}
        </l.FlexColumn>
      </Link>
      <Switch>
        <Route exact path="/" component={undefined} />
        <>
          <Nav />
          {activeLiveSessions.length > 0 && (
            <l.AreaLink position="absolute" to="/live" top={th.spacing.sm} right={th.spacing.sm}>
              <LiveIndicator />
            </l.AreaLink>
          )}
        </>
      </Switch>
    </Sticky>
  );
};

export default Header;
