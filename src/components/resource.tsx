import React from 'react';
import * as api from 'api';
import arrowImg from 'assets/images/arrow.svg';
import Modal from 'components/modal';
import Notes from 'components/notes';
import TagSet from 'components/tag-set';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';
import { getTags } from 'utils/tags';

export const ResourceLink = ({ to }: { to: string }) => (
  <l.Anchor onClick={(e) => e.stopPropagation()} target="_blank" href={to} rel="noopener noreferrer">
    <l.FlexCentered>
      <l.Img height={th.sizes.icon} src={arrowImg} />
    </l.FlexCentered>
  </l.Anchor>
);

const Resource = ({ notes, src, tagIds, title, to, typeIds }: api.Resource) => {
  const allTags = api.fetchTags();
  const typeTags = getTags(typeIds, allTags);
  const tagTags = getTags(tagIds, allTags);

  return (
    <l.Div flex={1} mb={th.spacing.sm}>
      <l.FlexBetween mb={th.spacing.sm} width={th.sizes.fill}>
        <l.Flex height={31}>
          <ty.Text fontWeight={th.fontWeights.semiBold}>{title}</ty.Text>
        </l.Flex>
        <l.Div transform="translateX(-1px)">
          <ResourceLink to={to} />
        </l.Div>
      </l.FlexBetween>
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
              <>
                <l.FlexCentered>
                  <ty.Text color={th.colors.white} fontSize={th.fontSizes.h3} mb={th.spacing.md}>
                    {title}
                  </ty.Text>
                </l.FlexCentered>
                <l.Img onClick={(e) => e.stopPropagation()} src={src} width={th.sizes.fill} />
                {notes && <Notes notes={notes} />}
              </>
            )}
          />
        </l.Div>
        <l.Div width="50%">
          <TagSet label="Type" tags={typeTags} />
          <TagSet label="Tags" tags={tagTags} />
        </l.Div>
      </l.FlexBetween>
      {notes && <Notes notes={notes} />}
    </l.Div>
  );
};

export default Resource;
