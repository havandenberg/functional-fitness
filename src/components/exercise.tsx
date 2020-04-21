import React from 'react';
import { isEmpty } from 'ramda';
import * as api from 'api';
import Modal from 'components/modal';
import TagSet from 'components/tag-set';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';
import { getTags } from 'utils/tags';

const Exercise = ({ equipment, muscleGroups, name, notes, skills, src }: api.Exercise) => {
  const tags = api.fetchTags();
  const muscleGroupsTags = getTags(muscleGroups, tags);
  const skillsTags = getTags(skills, tags);
  const equipmentTags = getTags(equipment, tags);

  return (
    <l.Div flex={1} mb={th.spacing.md} mt={th.spacing.sm} mx={th.spacing.md}>
      <l.Flex height={31} mb={th.spacing.sm}>
        <ty.Text fontWeight={th.fontWeights.semiBold}>{name}</ty.Text>
      </l.Flex>
      <l.FlexBetween alignStart>
        <l.Div flexBasis="50%">
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
              <>
                <l.FlexCentered>
                  <ty.Text color={th.colors.white} fontSize={th.fontSizes.h3} mb={th.spacing.md}>
                    {name}
                  </ty.Text>
                </l.FlexCentered>
                <l.Img onClick={(e) => e.stopPropagation()} src={src} width={th.sizes.fill} />
                {notes && !isEmpty(notes) && (
                  <>
                    <ty.Label color={th.colors.white} mb={th.spacing.sm} mt={th.spacing.md}>
                      Notes
                    </ty.Label>
                    <ty.Text color={th.colors.white} fontWeight={th.fontWeights.light}>
                      {notes}
                    </ty.Text>
                  </>
                )}
              </>
            )}
          />
        </l.Div>
        <l.Div flexBasis="50%">
          <TagSet label="Muscle Groups" tags={muscleGroupsTags} />
          <TagSet label="Skills" tags={skillsTags} />
          <TagSet label="Equipment" tags={equipmentTags} />
        </l.Div>
      </l.FlexBetween>
      {notes && !isEmpty(notes) && (
        <>
          <ty.Label>Notes</ty.Label>
          <ty.Text>{notes}</ty.Text>
        </>
      )}
    </l.Div>
  );
};

export default Exercise;
