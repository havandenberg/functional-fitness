import React from 'react';
import { isEmpty } from 'ramda';
import * as api from 'api';
import arrowImg from 'assets/images/arrow.svg';
import Maximize from 'components/maximize';
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
    <l.Div flex={1} mb={th.spacing.md}>
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
          {src && (
            <Maximize
              toggle={<l.Img src={src} width={th.sizes.fill} />}
              content={
                <>
                  <l.FlexCentered bg={th.colors.background} onClick={(e) => e.stopPropagation()}>
                    <ty.Text center fontSize={th.fontSizes.h3} mb={th.spacing.md} mt={th.spacing.sm}>
                      {title}
                    </ty.Text>
                  </l.FlexCentered>
                  <l.Div bg={th.colors.background} flex={1} onClick={(e) => e.stopPropagation()} scroll>
                    <l.Img pb={th.spacing.sm} px={th.spacing.sm} src={src} width={th.sizes.fill} />
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
          <TagSet label="Type" tags={typeTags} />
          <TagSet label="Tags" tags={tagTags} />
        </l.Div>
      </l.FlexBetween>
      {notes && !isEmpty(notes) && <Notes notes={notes} />}
    </l.Div>
  );
};

export default Resource;
