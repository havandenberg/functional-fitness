import React from 'react';
import moment from 'moment';
import { BorderSetProps } from 'onno-react';
import * as api from 'api';
import exercisesImg from 'assets/images/exercises-m.svg';
import infoImg from 'assets/images/info.svg';
import resourcesImg from 'assets/images/resources.svg';
import scheduleImg from 'assets/images/schedule.svg';
import zoomImg from 'assets/images/zoom.png';
import Loading from 'components/loading';
import { useGlobalContext } from 'context/global';
import b from 'ui/button';
import l from 'ui/layout';
import Link from 'ui/link';
import th from 'ui/theme';
import ty from 'ui/typography';
import { getUpcomingSessions } from './schedule';

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
  const [liveSessions, loading] = api.useFetchLiveSessions();
  const activeLiveSessions = liveSessions && liveSessions.filter((liveSession) => liveSession.isLive);
  const upcomingSessions = getUpcomingSessions(liveSessions);
  return (
    <>
      <l.Centered py={th.spacing.lg}>
        {activeLiveSessions.length > 0 ? (
          <>
            <l.Anchor mb={24} href={`https://zoom.us/j/${process.env.REACT_APP_ZOOM_ID}`} target="_blank">
              <l.Flex alignEnd>
                <ty.Label bold fontSize={12} mr="6px">
                  Join
                </ty.Label>
                <l.Img height={th.sizes.md} mb={th.spacing.tn} src={zoomImg} />
                <ty.Label bold fontSize={12} ml="6px">
                  Room
                </ty.Label>
              </l.Flex>
            </l.Anchor>
            <l.AreaLink mb={24} to="/live">
              <b.Primary bg={th.colors.status.success} color={th.colors.white}>
                <ty.Label bold color={th.colors.white} fontSize={12}>
                  Live Session Tracker
                </ty.Label>
              </b.Primary>
            </l.AreaLink>
            {user ? (
              <b.Default height={th.sizes.xs} onClick={logout}>
                <ty.Label>Logout</ty.Label>
              </b.Default>
            ) : (
              <l.AreaLink to="/login">
                <ty.Label bold>Instructor Login</ty.Label>
              </l.AreaLink>
            )}
          </>
        ) : (
          <>
            {upcomingSessions.length > 0 ? (
              <l.AreaLink to={`/sessions/${upcomingSessions[0].id}`}>
                <l.Centered>
                  <ty.Label fontSize={12} mb={th.spacing.sm}>
                    Next Session:
                  </ty.Label>
                  <ty.Text fontWeight={th.fontWeights.semiBold} mb={th.spacing.sm}>
                    {upcomingSessions[0].name}
                  </ty.Text>
                  <ty.Text>
                    {moment(upcomingSessions[0].start).format('ddd MM/DD')} <l.Primary>at</l.Primary>{' '}
                    {moment(upcomingSessions[0].start).format('hh:mma')} <l.Primary>(EST)</l.Primary>
                  </ty.Text>
                </l.Centered>
              </l.AreaLink>
            ) : loading ? (
              <Loading />
            ) : (
              <ty.Text>No upcoming sessions.</ty.Text>
            )}
          </>
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
