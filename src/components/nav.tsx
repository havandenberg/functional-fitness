import React from 'react';
import { BorderSetProps } from 'onno-react';
import { useLocation } from 'react-router-dom';
import exercisesFImg from 'assets/images/exercises-f.svg';
import exercisesMImg from 'assets/images/exercises-m.svg';
import infoImg from 'assets/images/info.svg';
import resourcesImg from 'assets/images/resources.svg';
import scheduleImg from 'assets/images/schedule.svg';
import l from 'ui/layout';
import Link from 'ui/link';
import th from 'ui/theme';

const NavItem = ({ active, src, to, ...rest }: { active?: boolean; src: string; to: string } & BorderSetProps) => (
  <Link type="area" to={to} flexBasis="25%">
    <l.FlexColumnCentered bg={active ? th.colors.brand.primaryHighlight : undefined} p={`${th.spacing.sm} 0`} {...rest}>
      <l.Img height={th.sizes.icon} src={src} />
    </l.FlexColumnCentered>
  </Link>
);

const Nav = () => {
  const { pathname } = useLocation();
  return (
    <l.FlexBetween bdb={th.borders.input} width={th.sizes.fill}>
      <NavItem active={pathname === '/start'} bdr={th.borders.input} src={infoImg} to="/start" />
      <NavItem active={pathname === '/schedule'} bdr={th.borders.input} src={scheduleImg} to="/schedule" />
      <NavItem active={pathname === '/exercises'} bdr={th.borders.input} src={exercisesFImg} to="/exercises" />
      <NavItem active={pathname === '/resources'} src={resourcesImg} to="/resources" />
    </l.FlexBetween>
  );
};

export default Nav;
