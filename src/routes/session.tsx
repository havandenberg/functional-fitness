import React from 'react';
import styled from '@emotion/styled';
import moment from 'moment';
import { find, includes, indexOf, isEmpty, pluck, propEq } from 'ramda';
import { Redirect, useParams } from 'react-router-dom';
import * as api from 'api';
import nextImg from 'assets/images/next-dark.svg';
import previousImg from 'assets/images/previous-dark.svg';
import LiveIndicator from 'components/live-indicator';
import Loading from 'components/loading';
import ScrollToTopController from 'components/scroll-controller';
import TagSet from 'components/tag-set';
import { mungeExerciseData } from 'routes/exercises';
import { getPastSessions, getUpcomingSessions } from 'routes/schedule';
import l from 'ui/layout';
import List from 'components/list';
import th from 'ui/theme';
import ty from 'ui/typography';
import { findItemsByIds, getAllTags } from 'utils/tags';

const DateText = styled(ty.Text)<{ isPast?: boolean }>(({ isPast }) => ({ opacity: isPast ? 0.5 : 1 }));

const Session = () => {
  const { id } = useParams();
  const [liveSessions, loading] = api.useFetchLiveSessions();
  const liveSession = find(propEq('id', id), liveSessions);

  const sessions = api.fetchSessions();
  const session = liveSession && find(propEq('id', liveSession.sessionId), sessions);

  if (loading) {
    return <Loading />;
  }

  if (!liveSession || !session) {
    return <Redirect to="/" />;
  }
  const { author, exerciseIds, name, notes } = session;
  const columns = [
    { title: 'Name', styles: { flex: 1 } },
    { title: 'Focus Areas', styles: { flex: 1 } },
  ];

  const pastSessions = getPastSessions(liveSessions);
  const upcomingSessions = getUpcomingSessions(liveSessions);
  const isPast = includes(liveSession.id, pluck('id', pastSessions));
  const sessionsByTime = isPast ? pastSessions : upcomingSessions;
  const liveSessionIndex = indexOf(liveSession.id, pluck('id', sessionsByTime));
  const isFirst = liveSessionIndex === 0;
  const isLast = liveSessionIndex === sessionsByTime.length - 1;
  const nextSession = isLast ? undefined : sessionsByTime[liveSessionIndex + 1];
  const previousSession = isFirst ? undefined : sessionsByTime[liveSessionIndex - 1];

  const allExercises = api.fetchExercises();
  const exercises = findItemsByIds<api.Exercise>(exerciseIds, allExercises);
  const tags = api.fetchTags();
  const muscleGroupIds = getAllTags<api.Exercise>('muscleGroupIds', exercises, tags);
  const skillIds = getAllTags<api.Exercise>('skillIds', exercises, tags);
  const equipmentIds = getAllTags<api.Exercise>('equipmentIds', exercises, tags);
  const items = exercises.map((exercise) => mungeExerciseData(exercise, tags));

  return (
    <>
      <l.FlexBetween mt={th.spacing.lg}>
        <l.AreaLink flexBasis="10%" to={isFirst || !previousSession ? '/schedule' : `/sessions/${previousSession.id}`}>
          <l.Centered height={th.sizes.md}>
            <l.Img src={previousImg} width={th.sizes.xs} />
          </l.Centered>
        </l.AreaLink>
        <l.Scroll showScrollBar={false} width="80%">
          <ty.H2 center fontSize={th.fontSizes.h3} nowrap>
            {liveSession.name || name}
          </ty.H2>
        </l.Scroll>
        <l.AreaLink flexBasis="10%" to={isLast || !nextSession ? '#' : `/sessions/${nextSession.id}`}>
          <l.Centered height={th.sizes.md}>{!isLast && <l.Img src={nextImg} width={th.sizes.xs} />}</l.Centered>
        </l.AreaLink>
      </l.FlexBetween>
      <l.Centered mb={th.spacing.lg}>
        {liveSession.isLive && (
          <l.AreaLink my={th.spacing.sm} to="/live">
            <LiveIndicator live />
          </l.AreaLink>
        )}
        {liveSession && (
          <>
            <DateText isPast={isPast} my={th.spacing.sm}>
              {moment(liveSession.start).format('ddd MM/DD')} <l.Primary>at</l.Primary>{' '}
              {moment(liveSession.start).format('hh:mma')} <l.Primary>(EST)</l.Primary>
            </DateText>
            <DateText isPast={isPast}>{liveSession.duration}</DateText>
          </>
        )}
      </l.Centered>
      <l.Div mx={th.spacing.md}>
        <ty.Label mb={th.spacing.tn}>Created By</ty.Label>
        <ty.Text mb={th.spacing.md}>{author}</ty.Text>
        {notes && !isEmpty(notes) && (
          <>
            <ty.Label mb={th.spacing.tn}>Notes</ty.Label>
            <ty.Text mb={th.spacing.md}>{notes}</ty.Text>
          </>
        )}
      </l.Div>
      <TagSet label="Muscle Groups" tags={muscleGroupIds} />
      <TagSet label="Skills" tags={skillIds} />
      <TagSet label="Equipment" tags={equipmentIds} />
      <l.Div height={th.spacing.md} />
      <List columns={columns} header={`Exercises (${exercises.length})`} isLoading={false} items={items} showIndices />
      <ScrollToTopController />
    </>
  );
};

export default Session;
