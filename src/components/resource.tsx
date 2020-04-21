import React from 'react';
import { isEmpty } from 'ramda';
import * as api from 'api';
import arrowImg from 'assets/images/arrow.svg';
import Modal from 'components/modal';
import TagSet from 'components/tag-set';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';
import { getTags } from 'utils/tags';

export const ResourceLink = ({ to }: { to: string }) => (
  <a onClick={(e) => e.stopPropagation()} target="_blank" href={to} rel="noopener noreferrer">
    <l.FlexCentered>
      <l.Img height={th.sizes.icon} src={arrowImg} />
    </l.FlexCentered>
  </a>
);

const Resource = ({ notes, src, tags, title, to, types }: api.Resource) => {
  const allTags = api.fetchTags();
  const typesTags = getTags(types, allTags);
  const tagsTags = getTags(tags, allTags);

  return (
    <l.Div flexBasis="100%" mb={th.spacing.md} mt={th.spacing.sm}>
      <l.FlexBetween mb={th.spacing.sm} width={th.sizes.fill}>
        <l.Flex height={31} ml={th.spacing.md}>
          <ty.Text fontWeight={th.fontWeights.semiBold}>{title}</ty.Text>
        </l.Flex>
        <ResourceLink to={to} />
      </l.FlexBetween>
      <l.Div mx={th.spacing.md}>
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
                      {title}
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
            <TagSet label="Type" tags={typesTags} />
            <TagSet label="Tags" tags={tagsTags} />
          </l.Div>
        </l.FlexBetween>
        {notes && !isEmpty(notes) && (
          <>
            <ty.Label>Notes</ty.Label>
            <ty.Text>{notes}</ty.Text>
          </>
        )}
      </l.Div>
    </l.Div>
  );
};

export default Resource;
