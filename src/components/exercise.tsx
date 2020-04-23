import React from 'react';
import * as api from 'api';
import Modal from 'components/modal';
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
    <l.Div flex={1} mb={th.spacing.sm}>
      {!live && (
        <l.Flex height={31} mb={th.spacing.sm}>
          <ty.Text fontWeight={th.fontWeights.semiBold}>{name}</ty.Text>
        </l.Flex>
      )}
      <l.FlexBetween alignStart mb={th.spacing.sm}>
        <l.Div width="50%">
          <Modal
            toggle={(show) => (
              <l.Img
                onClick={(e) => {
                  e.stopPropagation();
                  show();
                }}
                src={src}
                width={th.sizes.fill}
              />
            )}
            content={() => (
              <l.Div mb={th.spacing.lg}>
                <l.FlexCentered>
                  <ty.Text color={th.colors.white} fontSize={th.fontSizes.h3} mb={th.spacing.md}>
                    {name}
                  </ty.Text>
                </l.FlexCentered>
                <l.Img mb={th.spacing.sm} onClick={(e) => e.stopPropagation()} src={src} width={th.sizes.fill} />
                {notes && <Notes live={live} notes={notes} />}
              </l.Div>
            )}
          />
        </l.Div>
        <l.Div width="50%">
          <TagSet label="Muscle Groups" tags={muscleGroupIdsTags} />
          <TagSet label="Skills" tags={skillIdsTags} />
          <l.Div width={th.sizes.fill}>
            <TagSet label="Equipment" tags={equipmentIdsTags} />
          </l.Div>
        </l.Div>
      </l.FlexBetween>
      {notes && <Notes notes={notes} />}
    </l.Div>
  );
};

export default Exercise;
