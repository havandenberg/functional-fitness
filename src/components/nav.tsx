import React from 'react';
import styled from '@emotion/styled';
import { BorderSetProps } from 'onno-react';
import { includes } from 'ramda';
import { useLocation } from 'react-router-dom';
import exercisesImg from 'assets/images/exercises-f.svg';
import infoImg from 'assets/images/info.svg';
import resourcesImg from 'assets/images/resources.svg';
import scheduleImg from 'assets/images/schedule.svg';
import l from 'ui/layout';
import Link from 'ui/link';
import th from 'ui/theme';

const NavItemWrapper = styled(l.Centered)({
  ':hover': {
    background: th.colors.brand.primaryHighlight,
  },
  padding: `${th.spacing.sm} 0`,
  transition: th.transitions.default,
});

const NavItem = ({ active, src, to, ...rest }: { active?: boolean; src: string; to: string } & BorderSetProps) => (
  <Link type="area" to={to} flexBasis="25%">
    <NavItemWrapper bg={active ? th.colors.brand.primaryHighlight : undefined} {...rest}>
      <l.Img height={th.sizes.icon} src={src} />
    </NavItemWrapper>
  </Link>
);

const Nav = () => {
  const { pathname } = useLocation();
  return (
    <l.FlexBetween bdb={th.borders.input} width={th.sizes.fill}>
      <NavItem active={pathname === '/start'} bdr={th.borders.input} src={infoImg} to="/start" />
      <NavItem
        active={pathname === '/schedule' || includes('/sessions', pathname)}
        bdr={th.borders.input}
        src={scheduleImg}
        to="/schedule"
      />
      <NavItem active={pathname === '/exercises'} bdr={th.borders.input} src={exercisesImg} to="/exercises" />
      <NavItem active={pathname === '/resources'} src={resourcesImg} to="/resources" />
    </l.FlexBetween>
  );
};

export default Nav;
