import React, { useState } from 'react';
import moment from 'moment';
import { filter, find, prop, propEq, sortBy } from 'ramda';
import * as api from 'api';
import List from 'components/list';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

const mungeLiveSessionData = (data: api.LiveSession, session: api.Session) => {
  const { id, datetime } = data;
  const { name } = session;
  return {
    id,
    columns: [
      moment(datetime).format('ddd MM/DD'),
      moment(datetime).format('hh:mma'),
      <ty.Text fontWeight={th.fontWeights.semiBold}>{name}</ty.Text>,
    ],
    to: `/sessions/${id}?liveId=${id}`,
  };
};

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

const Schedule = () => {
  const [past, setPast] = useState(false);
  const columns = [
    { title: 'Date', styles: { flexBasis: '85px' } },
    { title: 'Time (EST)', styles: { flexBasis: '70px' } },
    { title: 'Name', styles: { flexGrow: 1 } },
  ];

  const sessions = api.fetchSessions();
  const [liveSessions, loading] = api.useFetchLiveSessions();

  const pastSessions = sortBy(
    prop('datetime'),
    filter(
      (session) => moment().startOf('day').diff(moment(session.datetime).startOf('day')) > 0,
      liveSessions as api.LiveSession[],
    ),
  ).reverse();
  const upcomingSessions = sortBy(
    prop('datetime'),
    filter(
      (session) => moment().startOf('day').diff(moment(session.datetime).startOf('day')) <= 0,
      liveSessions as api.LiveSession[],
    ),
  );
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
        <ty.H2 fontSize={th.fontSizes.h3} mb={th.spacing.tn}>
          Session Schedule
        </ty.H2>
        <l.Anchor
          href="https://calendar.google.com/calendar/embed?src=pa841r7rt7s923pmocsrdb38q0%40group.calendar.google.com"
          target="_blank"
        >
          <ty.Label>View in Google Calendar</ty.Label>
        </l.Anchor>
        <l.Div mt={th.spacing.tn} onClick={copyGCalLink}>
          <ty.Label>Copy iCal link</ty.Label>
        </l.Div>
      </l.Centered>
      <l.FlexBetween bdb={th.borders.input} bdt={th.borders.input} mb={th.spacing.lg}>
        <l.FlexCentered bdr={th.borders.input} flexBasis="50%" onClick={() => setPast(false)} py={th.spacing.sm}>
          <ty.Text active={!past}>Upcoming</ty.Text>
        </l.FlexCentered>
        <l.FlexCentered flexBasis="50%" onClick={() => setPast(true)} py={th.spacing.sm}>
          <ty.Text active={past}>Past</ty.Text>
        </l.FlexCentered>
      </l.FlexBetween>
      <List columns={columns} header={header} isLoading={loading} items={items} />
    </>
  );
};

export default Schedule;
