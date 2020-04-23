import React from 'react';
import { BorderSetProps } from 'onno-react';
import exercisesImg from 'assets/images/exercises-m.svg';
import infoImg from 'assets/images/info.svg';
import resourcesImg from 'assets/images/resources.svg';
import scheduleImg from 'assets/images/schedule.svg';
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

const Home = () => (
  <>
    <l.FlexCentered py={th.spacing.lg}>
      <l.AreaLink to="/live">
        <b.Primary bg={th.colors.status.success}>Join Live Class</b.Primary>
      </l.AreaLink>
    </l.FlexCentered>
    <l.FlexBetween flexWrap="wrap" bdb={th.borders.input} bdt={th.borders.input}>
      <Quadrant bdb={th.borders.input} bdr={th.borders.input} src={infoImg} text="Getting Started" to="/start" />
      <Quadrant bdb={th.borders.input} src={scheduleImg} text="Session Schedule" to="/schedule" />
      <Quadrant bdr={th.borders.input} src={exercisesImg} text="Exercises" to="/exercises" />
      <Quadrant src={resourcesImg} text="Fitness Resources" to="/resources" />
    </l.FlexBetween>
  </>
);

export default Home;