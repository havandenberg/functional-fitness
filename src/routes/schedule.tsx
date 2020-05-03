import React, { useState } from 'react';
import styled from '@emotion/styled';
import moment from 'moment';
import { filter, find, prop, propEq, sortBy } from 'ramda';
import * as api from 'api';
import List from 'components/list';
import LiveIndicator from 'components/live-indicator';
import ScrollToTopController from 'components/scroll-controller';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

const LiveWrapper = styled(l.Div)({
  position: 'absolute',
  right: 22,
  top: th.spacing.sm,
  transform: 'translateY(-2px)',
});

const copyGCalLink = () => {
  var dummy = document.createElement('textarea');
  dummy.style.display = 'none';
  document.body.appendChild(dummy);
  dummy.value =
    'https://calendar.google.com/calendar/ical/pa841r7rt7s923pmocsrdb38q0%40group.calendar.google.com/public/basic.ics';
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
};

export const getPastSessions = (liveSessions: api.LiveSession[]) =>
  sortBy(
    prop('start'),
    filter((session) => moment().diff(moment(session.end)) > 0, liveSessions),
  ).reverse();

export const getUpcomingSessions = (liveSessions: api.LiveSession[]) =>
  sortBy(
    prop('start'),
    filter((session) => moment().diff(moment(session.end)) <= 0, liveSessions),
  );

const mungeLiveSessionData = (data: api.LiveSession, session: api.Session) => {
  const { id, start, isLive, name: liveSessionName } = data;
  const { name: sessionName } = session;
  return {
    id,
    columns: [
      moment(start).format('ddd MM/DD'),
      moment(start).format('hh:mma'),
      <>
        <l.FlexBetween pr={isLive ? 37 : undefined}>
          <ty.Text fontWeight={th.fontWeights.semiBold}>{liveSessionName || sessionName}</ty.Text>
        </l.FlexBetween>
        {isLive && (
          <LiveWrapper>
            <LiveIndicator live />
          </LiveWrapper>
        )}
      </>,
    ],
    to: `/sessions/${id}`,
  };
};

const Schedule = () => {
  const [past, setPast] = useState(false);
  const columns = [
    { title: 'Date', styles: { flexBasis: '85px' } },
    { title: 'Time (EST)', styles: { flexBasis: '70px' } },
    { title: 'Name', styles: { flex: 1 } },
  ];

  const sessions = api.fetchSessions();
  const [liveSessions, loading] = api.useFetchLiveSessions();

  const pastSessions = getPastSessions(liveSessions);
  const upcomingSessions = getUpcomingSessions(liveSessions);
  const items: any[] = filter(
    (liveSession) => !!liveSession,
    (past ? pastSessions : upcomingSessions).map((liveSession) => {
      const session = find(propEq('id', liveSession.sessionId), sessions);
      return session ? mungeLiveSessionData(liveSession, session) : undefined;
    }),
  );
  const header = `Sessions ${loading ? '' : '(' + items.length + ')'}`;

  return (
    <>
      <l.Centered my={th.spacing.lg}>
        <ty.H2 fontSize={th.fontSizes.h3} mb={th.spacing.sm}>
          Session Schedule
        </ty.H2>
        <l.Anchor
          href="https://calendar.google.com/calendar/embed?src=pa841r7rt7s923pmocsrdb38q0%40group.calendar.google.com"
          mb={th.spacing.sm}
          target="_blank"
        >
          <ty.Label>View in Google Calendar</ty.Label>
        </l.Anchor>
        <l.Div mt={th.spacing.tn} onClick={copyGCalLink} pointer>
          <ty.Label>Copy iCal link</ty.Label>
        </l.Div>
      </l.Centered>
      <l.FlexBetween bdb={th.borders.input} bdt={th.borders.input} mb={th.spacing.lg}>
        <l.FlexCentered
          bdr={th.borders.input}
          flexBasis="50%"
          onClick={() => setPast(false)}
          pointer
          py={th.spacing.sm}
        >
          <ty.Text active={!past}>Upcoming</ty.Text>
        </l.FlexCentered>
        <l.FlexCentered flexBasis="50%" onClick={() => setPast(true)} pointer py={th.spacing.sm}>
          <ty.Text active={past}>Past</ty.Text>
        </l.FlexCentered>
      </l.FlexBetween>
      <List columns={columns} header={header} isLoading={loading} items={items} />
      <ScrollToTopController />
    </>
  );
};

export default Schedule;
