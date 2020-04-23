import React from 'react';
import { find, propEq } from 'ramda';
import { Redirect } from 'react-router-dom';
import * as api from 'api';
import Exercise from 'components/exercise';
import { useLiveQueryParams } from 'hooks/use-query-params';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

const Live = () => {
  const [{ liveId }] = useLiveQueryParams();
  const liveSessions = api.fetchLiveSessions();
  const liveSession = find(propEq('id', liveId || '0'), liveSessions);
  const sessions = api.fetchSessions();
  const session = liveSession && find(propEq('id', liveSession.sessionId), sessions);

  if (!session || !liveSession) {
    return <Redirect to="/" />;
  }

  const exercises = api.fetchExercises();
  const activeExercise = exercises[liveSession.activeExerciseIndex || 0];
  const activeLiveExercise = liveSession.exercises[liveSession.activeExerciseIndex || 0];
  if (!activeExercise) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <l.Centered mb={th.spacing.sm} mt={th.spacing.md}>
        <ty.Label>Session</ty.Label>
        <ty.Text>{session.name}</ty.Text>
      </l.Centered>
      <l.Centered bg="#3A3A3A" height={85}>
        <ty.Label color={th.colors.white}>Active Exercise</ty.Label>
        <ty.H3 color={th.colors.white}>{activeExercise.name}</ty.H3>
      </l.Centered>
      <l.Flex bdb={th.borders.input}>
        <l.Centered bdr={th.borders.input} flex={1} height={85}>
          <ty.Label>Sets</ty.Label>
          <ty.Text bold fontSize="30px">
            {activeLiveExercise.setCount}
          </ty.Text>
        </l.Centered>
        <l.Centered flex={1} height={85}>
          <ty.Label>{activeLiveExercise.type}</ty.Label>
          <ty.Text bold fontSize="30px">
            {activeLiveExercise.count}
          </ty.Text>
        </l.Centered>
      </l.Flex>
      <l.Div my={th.spacing.lg} mx={th.spacing.md}>
        <Exercise {...activeExercise} live />
      </l.Div>
    </>
  );
};

export default Live;
