import React from 'react';
import { isEmpty } from 'ramda';
import * as api from 'api';
import Maximize from 'components/maximize';
import Notes from 'components/notes';
import TagSet from 'components/tag-set';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';
import { getTags } from 'utils/tags';

interface Props {
  live?: boolean;
}

const Exercise = ({ equipmentIds, live, muscleGroupIds, name, notes, skillIds, src }: Props & api.Exercise) => {
  const tags = api.fetchTags();
  const muscleGroupIdsTags = getTags(muscleGroupIds, tags);
  const skillIdsTags = getTags(skillIds, tags);
  const equipmentIdsTags = getTags(equipmentIds, tags);

  return (
    <l.Div flex={1} mb={th.spacing.md}>
      {!live && (
        <l.Flex height={31} mb={th.spacing.sm}>
          <ty.Text fontWeight={th.fontWeights.semiBold}>{name}</ty.Text>
        </l.Flex>
      )}
      <l.FlexBetween alignStart mb={th.spacing.sm}>
        <l.Div width="50%">
          {src && (
            <Maximize
              toggle={<l.Img src={src} width={th.sizes.fill} />}
              content={
                <>
                  <l.FlexCentered>
                    <ty.Text center fontSize={th.fontSizes.h3} mb={th.spacing.md} mt={th.spacing.sm}>
                      {name}
                    </ty.Text>
                  </l.FlexCentered>
                  <l.Div flex={1} maxWidth={600} mx="auto" px={th.spacing.sm}>
                    <l.Img pb={th.spacing.sm} src={src} width={th.sizes.fill} />
                    {notes && !isEmpty(notes) && (
                      <l.Div px={th.spacing.md} pb={th.spacing.lg}>
                        <Notes notes={notes} />
                      </l.Div>
                    )}
                  </l.Div>
                </>
              }
            />
          )}
        </l.Div>
        <l.Div width="50%">
          <TagSet label="Muscle Groups" tags={muscleGroupIdsTags} />
          <TagSet label="Skills" tags={skillIdsTags} />
          <l.Div width={th.sizes.fill}>
            <TagSet label="Equipment" tags={equipmentIdsTags} />
          </l.Div>
        </l.Div>
      </l.FlexBetween>
      {notes && !isEmpty(notes) && <Notes notes={notes} />}
    </l.Div>
  );
};

export default Exercise;
