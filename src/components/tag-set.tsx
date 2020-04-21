import React from 'react';
import styled from '@emotion/styled';
import { contains, isEmpty } from 'ramda';
import * as api from 'api';
import Tag from 'components/tag';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

export const TagWrapper = styled(l.Div)({
  ':last-child': { marginRight: 0 },
  marginRight: th.spacing.sm,
});

interface Props {
  enabledTags: string[];
  label?: string;
  tags: api.Tag[];
  toggleTag: (id: string) => void;
}

const TagSet = ({ enabledTags, label, tags, toggleTag }: Props) => (
  <l.Div mb={th.spacing.md} mx={th.spacing.md}>
    {label && <ty.Label mb={th.spacing.tn}>{label}</ty.Label>}
    <l.Scroll display="flex" overflowX="auto" showScrollBar={false}>
      {tags.map((tag, i) => (
        <TagWrapper key={i}>
          <Tag
            active={isEmpty(enabledTags) || contains(tag.id, enabledTags)}
            size="small"
            toggleTag={toggleTag}
            {...tag}
          />
        </TagWrapper>
      ))}
    </l.Scroll>
  </l.Div>
);

export default TagSet;
