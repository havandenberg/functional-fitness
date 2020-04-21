import React, { useState } from 'react';
import { any, contains, flatten, isEmpty, pick, pluck, reduce, uniq, values } from 'ramda';
import * as api from 'api';
import List from 'components/list';
import Resource, { ResourceLink } from 'components/resource';
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
    columns: [<ty.Text fontWeight={th.fontWeights.semiBold}>{title}</ty.Text>, allTags, <ResourceLink to={to} />],
    content: <Resource {...data} />,
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

  const [enabledTags, toggleTag] = useEnabledTagSet(resourceTags);

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
      <l.FlexColumnCentered mb={th.spacing.md} mt={th.spacing.lg}>
        <ty.H2 fontSize={th.fontSizes.h3}>Fitness Resources</ty.H2>
      </l.FlexColumnCentered>
      <Search search={search} setSearch={setSearch} />
      <TagSet enabledTags={enabledTags} label="Tags" tags={resourceTags} toggleTag={toggleTag} />
      <l.Div height={th.spacing.md} />
      <List header={`Resources (${items.length})`} columns={columns} isLoading={false} items={items} />
    </>
  );
};

export default Resources;
