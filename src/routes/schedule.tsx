import React, { useState } from 'react';
import moment from 'moment';
import { filter, prop, sortBy } from 'ramda';
import * as api from 'api';
import List from 'components/list';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

const mungeSessionData = (data: api.Session) => {
  const { id, name, datetime } = data;
  return {
    id,
    columns: [moment(datetime).format('ddd MM/DD'), moment(datetime).format('hh:mma'), name],
    to: `/sessions/${id}`,
  };
};

const Schedule = () => {
  const [past, setPast] = useState(false);
  const columns = [
    { title: 'Date', styles: { flexBasis: '100px' } },
    { title: 'Time', styles: { flexBasis: '100px' } },
    { title: 'Name', styles: { flexGrow: 1 } },
  ];

  const sessions = api.fetchSessions();
  const pastSessions = sortBy(
    prop('datetime'),
    filter((session) => moment().startOf('day').diff(moment(session.datetime).startOf('day')) > 0, sessions),
  ).reverse();
  const upcomingSessions = sortBy(
    prop('datetime'),
    filter((session) => moment().startOf('day').diff(moment(session.datetime).startOf('day')) <= 0, sessions),
  );
  const items = (past ? pastSessions : upcomingSessions).map((session) => mungeSessionData(session));

  return (
    <>
      <l.FlexColumnCentered my={th.spacing.lg}>
        <ty.H2 fontSize={th.fontSizes.h3}>Session Schedule</ty.H2>
      </l.FlexColumnCentered>
      <l.FlexBetween bdb={th.borders.input} bdt={th.borders.input} mb={th.spacing.lg}>
        <l.FlexCentered bdr={th.borders.input} flexBasis="50%" onClick={() => setPast(false)} py={th.spacing.sm}>
          <ty.Text active={!past}>Upcoming</ty.Text>
        </l.FlexCentered>
        <l.FlexCentered flexBasis="50%" onClick={() => setPast(true)} py={th.spacing.sm}>
          <ty.Text active={past}>Past</ty.Text>
        </l.FlexCentered>
      </l.FlexBetween>
      <List columns={columns} header={`Sessions (${items.length})`} isLoading={false} items={items} />
    </>
  );
};

export default Schedule;
