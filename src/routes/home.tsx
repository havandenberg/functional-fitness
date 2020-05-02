import React from 'react';
import { BorderSetProps } from 'onno-react';
import exercisesImg from 'assets/images/exercises-m.svg';
import infoImg from 'assets/images/info.svg';
import resourcesImg from 'assets/images/resources.svg';
import scheduleImg from 'assets/images/schedule.svg';
import { useGlobalContext } from 'context/global';
import b from 'ui/button';
import l from 'ui/layout';
import Link from 'ui/link';
import th from 'ui/theme';
import ty from 'ui/typography';

const Quadrant = ({ src, text, to, ...rest }: { src: string; text: string; to: string } & BorderSetProps) => (
  <Link type="area" to={to} flexBasis="50%">
    <l.Centered padding={`${th.spacing.lg} 0`} {...rest}>
      <l.Img height={th.sizes.lg} mb={th.spacing.md} src={src} />
      <ty.Text size="large">{text}</ty.Text>
    </l.Centered>
  </Link>
);

const Home = () => {
  const [{ user }, { logout }] = useGlobalContext();
  return (
    <>
      <l.Centered py={th.spacing.lg}>
        <l.AreaLink mb={th.spacing.md} to="/live">
          <b.Primary bg={th.colors.status.success} color={th.colors.white}>
            <ty.Label color={th.colors.white}>Join Live Class</ty.Label>
          </b.Primary>
        </l.AreaLink>
        {user ? (
          <b.Default height={th.sizes.xs} onClick={logout}>
            <ty.Label>Logout</ty.Label>
          </b.Default>
        ) : (
          <l.AreaLink to="/login">
            <ty.Label>Instructor Login</ty.Label>
          </l.AreaLink>
        )}
      </l.Centered>
      <l.FlexBetween flexWrap="wrap" bdb={th.borders.input} bdt={th.borders.input}>
        <Quadrant bdb={th.borders.input} bdr={th.borders.input} src={infoImg} text="Getting Started" to="/start" />
        <Quadrant bdb={th.borders.input} src={scheduleImg} text="Session Schedule" to="/schedule" />
        <Quadrant bdr={th.borders.input} src={exercisesImg} text="Exercises" to="/exercises" />
        <Quadrant src={resourcesImg} text="Fitness Resources" to="/resources" />
      </l.FlexBetween>
    </>
  );
};

export default Home;
