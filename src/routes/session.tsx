import React from 'react';
import moment from 'moment';
import { find, isEmpty, propEq } from 'ramda';
import { Redirect, useParams } from 'react-router-dom';
import * as api from 'api';
import TagSet from 'components/tag-set';
import { mungeExerciseData } from 'routes/exercises';
import { useLiveQueryParams } from 'hooks/use-query-params';
import l from 'ui/layout';
import List from 'components/list';
import th from 'ui/theme';
import ty from 'ui/typography';
import { findItemsByIds, getAllTags } from 'utils/tags';

const Session = () => {
  const sessions = api.fetchSessions();
  const { id } = useParams();
  const session = find(propEq('id', id), sessions as api.Session[]);

  const [liveSessions] = api.useFetchLiveSessions();
  const [{ liveId }] = useLiveQueryParams();
  const liveSession = find(propEq('id', liveId), liveSessions as api.LiveSession[]);

  if (!session) {
    return <Redirect to="/" />;
  }
  const { author, exerciseIds, name, notes } = session;
  const columns = [
    { title: 'Name', styles: { flex: 1 } },
    { title: 'Focus Areas', styles: { flex: 1 } },
  ];

  const allExercises = api.fetchExercises();
  const exercises = findItemsByIds<api.Exercise>(exerciseIds, allExercises);
  const tags = api.fetchTags();
  const muscleGroupIds = getAllTags<api.Exercise>('muscleGroupIds', exercises, tags);
  const skillIds = getAllTags<api.Exercise>('skillIds', exercises, tags);
  const equipmentIds = getAllTags<api.Exercise>('equipmentIds', exercises, tags);
  const items = exercises.map((exercise) => mungeExerciseData(exercise, tags));

  return (
    <>
      <l.Centered mb={th.spacing.md} mt={th.spacing.lg}>
        <ty.H2 fontSize={th.fontSizes.h3} mb={th.spacing.tn}>
          {name}
        </ty.H2>
        {liveSession && (
          <ty.Text>
            {moment(liveSession.datetime).format('ddd MM/DD')} <l.Primary>at</l.Primary>{' '}
            {moment(liveSession.datetime).format('hh:mma')} <l.Primary>(EST)</l.Primary>
          </ty.Text>
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
    </>
  );
};

export default Session;
