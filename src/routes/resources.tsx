import React, { useState } from 'react';
import { any, contains, flatten, isEmpty, pick, pluck, reduce, uniq, values } from 'ramda';
import * as api from 'api';
import arrowImg from 'assets/images/arrow.svg';
import resourcesImg from 'assets/images/resources.svg';
import List from 'components/list';
import Search from 'components/search';
import TagSet, { TagWrapper } from 'components/tag-set';
import Tag from 'components/tag';
import { useEnabledTagSet } from 'hooks/use-enabled-tag-set';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';
import { getTags } from 'utils/tags';

const mungeResourceData = (data: api.Resource, tags: api.Tag[]) => {
  const { id, tags: rowTags, title, to } = data;
  const allTags = (
    <l.Flex>
      {getTags(rowTags, tags).map((tag, i) => (
        <TagWrapper key={i}>
          <Tag size="small" {...tag} />
        </TagWrapper>
      ))}
    </l.Flex>
  );
  return {
    id,
    columns: [
      title,
      allTags,
      <a onClick={(e) => e.stopPropagation()} target="_blank" href={to} rel="noopener noreferrer">
        <l.FlexCentered>
          <l.Img height={th.sizes.icon} src={arrowImg} />
        </l.FlexCentered>
      </a>,
    ],
    content: <l.Div height={200} />,
  };
};

const Resources = () => {
  const [search, setSearch] = useState('');
  const columns = [
    { title: 'Name', styles: { flexBasis: '60%' } },
    { title: 'Tags', styles: { flexBasis: '40%' } },
    { title: 'Link', styles: { flexBasis: 45 } },
  ];

  const resources = api.fetchResources();
  const tags = api.fetchTags();
  const resourceTags = getTags(uniq(flatten(pluck('tags', resources))), tags);

  const [enabledTags, toggleTag] = useEnabledTagSet();

  const filteredResources = resources.filter((resource) => {
    const validTags = isEmpty(enabledTags) || any((id) => contains(id, resource.tags), enabledTags);
    return (
      validTags &&
      reduce(
        (containsSearch: boolean, value: string) =>
          containsSearch || contains(search.toLowerCase(), value.toLowerCase()),
        false,
        values(pick(['title', 'notes'], resource)),
      )
    );
  });
  const items = filteredResources.map((resource) => mungeResourceData(resource, tags));

  return (
    <>
      <l.FlexColumnCentered my={th.spacing.lg}>
        <l.Img height={th.sizes.lg} mb={th.spacing.md} src={resourcesImg} />
        <ty.H2>Fitness Resources</ty.H2>
      </l.FlexColumnCentered>
      <Search search={search} setSearch={setSearch} />
      <TagSet enabledTags={enabledTags} label="Tags" tags={resourceTags} toggleTag={toggleTag} />
      <l.Div height={th.spacing.md} />
      <List header={`Resources (${items.length})`} columns={columns} isLoading={false} items={items} />
    </>
  );
};

export default Resources;
