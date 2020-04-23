import React, { useState } from 'react';
import { any, contains, isEmpty, pick, reduce, values } from 'ramda';
import * as api from 'api';
import List from 'components/list';
import Exercise from 'components/exercise';
import Search from 'components/search';
import Tag from 'components/tag';
import TagSet, { TagWrapper } from 'components/tag-set';
import { useEnabledTagSet } from 'hooks/use-enabled-tag-set';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';
import { getAllTags, getTags } from 'utils/tags';

export const mungeExerciseData = (data: api.Exercise, tags: api.Tag[]) => {
  const { equipmentIds, id, muscleGroupIds, name, skillIds } = data;
  const combinedTags: api.Tag[] = [
    ...getTags(muscleGroupIds, tags),
    ...getTags(skillIds, tags),
    ...getTags(equipmentIds, tags),
  ];

  const focusAreas = (
    <l.Flex>
      {combinedTags.map((tag, i) => (
        <TagWrapper key={i}>
          <Tag size="small" {...tag} />
        </TagWrapper>
      ))}
    </l.Flex>
  );

  return {
    id,
    columns: [<ty.Text fontWeight={th.fontWeights.semiBold}>{name}</ty.Text>, focusAreas],
    content: <Exercise {...data} />,
  };
};

const Exercises = () => {
  const [search, setSearch] = useState('');
  const columns = [
    { title: 'Name', styles: { flex: 1 } },
    { title: 'Focus Areas', styles: { flex: 1 } },
  ];

  const exercises = api.fetchExercises();
  const tags = api.fetchTags();
  const muscleGroupIds = getAllTags<api.Exercise>('muscleGroupIds', exercises, tags);
  const skillIds = getAllTags<api.Exercise>('skillIds', exercises, tags);
  const equipmentIds = getAllTags<api.Exercise>('equipmentIds', exercises, tags);

  const [enabledMuscleGroupTags, toggleMuscleGroupTag] = useEnabledTagSet(muscleGroupIds);
  const [enabledSkillsTags, toggleSkillsTag] = useEnabledTagSet(skillIds);
  const [enabledEquipmentTags, toggleEquipmentTag] = useEnabledTagSet(equipmentIds);

  const filteredExercises = exercises.filter((exercise) => {
    const validMuscleGroups =
      isEmpty(enabledMuscleGroupTags) || any((id) => contains(id, exercise.muscleGroupIds), enabledMuscleGroupTags);
    const validSkills = isEmpty(enabledSkillsTags) || any((id) => contains(id, exercise.skillIds), enabledSkillsTags);
    const validEquipment =
      isEmpty(enabledEquipmentTags) || any((id) => contains(id, exercise.equipmentIds), enabledEquipmentTags);
    return (
      validMuscleGroups &&
      validSkills &&
      validEquipment &&
      reduce(
        (containsSearch: boolean, value: string) =>
          containsSearch || contains(search.toLowerCase(), value.toLowerCase()),
        false,
        values(pick(['name' /*, 'notes'*/], exercise)),
      )
    );
  });
  const items = filteredExercises.map((exercise) => mungeExerciseData(exercise, tags));

  return (
    <>
      <l.Centered mb={th.spacing.md} mt={th.spacing.lg}>
        <ty.H2 fontSize={th.fontSizes.h3}>All Exercises</ty.H2>
      </l.Centered>
      <Search search={search} setSearch={setSearch} />
      <TagSet
        enabledTags={enabledMuscleGroupTags}
        label="Muscle Groups"
        tags={muscleGroupIds}
        toggleTag={toggleMuscleGroupTag}
      />
      <TagSet enabledTags={enabledSkillsTags} label="Skills" tags={skillIds} toggleTag={toggleSkillsTag} />
      <TagSet enabledTags={enabledEquipmentTags} label="Equipment" tags={equipmentIds} toggleTag={toggleEquipmentTag} />
      <l.Div height={th.spacing.md} />
      <List columns={columns} header={`Exercises (${items.length})`} isLoading={false} items={items} />
    </>
  );
};

export default Exercises;
