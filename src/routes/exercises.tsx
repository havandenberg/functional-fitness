import React, { useState } from 'react';
import { any, contains, flatten, isEmpty, pick, pluck, reduce, uniq, values } from 'ramda';
import * as api from 'api';
import exercisesFImg from 'assets/images/exercises-f.svg';
import exercisesMImg from 'assets/images/exercises-m.svg';
import List from 'components/list';
import Exercise from 'components/exercise';
import Search from 'components/search';
import Tag from 'components/tag';
import TagSet, { TagWrapper } from 'components/tag-set';
import { useEnabledTagSet } from 'hooks/use-enabled-tag-set';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';
import { getTags } from 'utils/tags';

const mungeExerciseData = (data: api.Exercise, tags: api.Tag[]) => {
  const { equipment, id, muscleGroups, name, skills } = data;
  const allTags: api.Tag[] = [...getTags(muscleGroups, tags), ...getTags(skills, tags), ...getTags(equipment, tags)];

  const focusAreas = (
    <l.Flex>
      {allTags.map((tag, i) => (
        <TagWrapper key={i}>
          <Tag size="small" {...tag} />
        </TagWrapper>
      ))}
    </l.Flex>
  );

  return {
    id,
    columns: [name, focusAreas],
    content: <Exercise {...data} />,
  };
};

const Exercises = () => {
  const [search, setSearch] = useState('');
  const columns = [
    { title: 'Name', styles: { flexBasis: '50%' } },
    { title: 'Focus Areas', styles: { flexBasis: '50%' } },
  ];

  const exercises = api.fetchExercises();
  const tags = api.fetchTags();
  const muscleGroups = getTags(uniq(flatten(pluck('muscleGroups', exercises))), tags);
  const skills = getTags(uniq(flatten(pluck('skills', exercises))), tags);
  const equipment = getTags(uniq(flatten(pluck('equipment', exercises))), tags);

  const [enabledMuscleGroupTags, toggleMuscleGroupTag] = useEnabledTagSet();
  const [enabledSkillsTags, toggleSkillsTag] = useEnabledTagSet();
  const [enabledEquipmentTags, toggleEquipmentTag] = useEnabledTagSet();

  const filteredExercises = exercises.filter((exercise) => {
    const validMuscleGroups =
      isEmpty(enabledMuscleGroupTags) || any((id) => contains(id, exercise.muscleGroups), enabledMuscleGroupTags);
    const validSkills = isEmpty(enabledSkillsTags) || any((id) => contains(id, exercise.skills), enabledSkillsTags);
    const validEquipment =
      isEmpty(enabledEquipmentTags) || any((id) => contains(id, exercise.equipment), enabledEquipmentTags);
    return (
      validMuscleGroups &&
      validSkills &&
      validEquipment &&
      reduce(
        (containsSearch: boolean, value: string) =>
          containsSearch || contains(search.toLowerCase(), value.toLowerCase()),
        false,
        values(pick(['name', 'notes'], exercise)),
      )
    );
  });
  const items = filteredExercises.map((exercise) => mungeExerciseData(exercise, tags));

  return (
    <>
      <l.FlexColumnCentered mb={th.spacing.md} mt={th.spacing.lg}>
        <l.Img height={th.sizes.lg} mb={th.spacing.md} src={exercisesMImg} />
        <ty.H2>Exercises</ty.H2>
      </l.FlexColumnCentered>
      <Search search={search} setSearch={setSearch} />
      <TagSet
        enabledTags={enabledMuscleGroupTags}
        label="Muscle Groups"
        tags={muscleGroups}
        toggleTag={toggleMuscleGroupTag}
      />
      <TagSet enabledTags={enabledSkillsTags} label="Skills" tags={skills} toggleTag={toggleSkillsTag} />
      <TagSet enabledTags={enabledEquipmentTags} label="Equipment" tags={equipment} toggleTag={toggleEquipmentTag} />
      <l.Div height={th.spacing.md} />
      <List columns={columns} header={`Exercises (${items.length})`} isLoading={false} items={items} />
    </>
  );
};

export default Exercises;
