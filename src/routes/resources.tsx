import React, { useState } from 'react';
import { any, contains, isEmpty, pick, reduce, values } from 'ramda';
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
import { getAllTags, getTags } from 'utils/tags';

const mungeResourceData = (data: api.Resource, tags: api.Tag[]) => {
  const { id, tagIds, title, to } = data;
  const allTags = (
    <l.Flex>
      {getTags(tagIds, tags).map((tag, i) => (
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
    { title: 'Name', styles: { flex: 6 } },
    { title: 'Tags', styles: { flex: 4 } },
    { title: 'Link', styles: { flexBasis: 25 } },
  ];

  const resources = api.fetchResources();
  const tags = api.fetchTags();
  const typeTags = getAllTags<api.Resource>('typeIds', resources, tags);
  const tagTags = getAllTags<api.Resource>('tagIds', resources, tags);

  const [enabledTypeTags, toggleTypeTag] = useEnabledTagSet(typeTags);
  const [enabledTagTags, toggleTagTag] = useEnabledTagSet(tagTags);

  const filteredResources = resources.filter((resource) => {
    const validTypeTags = isEmpty(enabledTypeTags) || any((id) => contains(id, resource.tagIds), enabledTypeTags);
    const validTagTags = isEmpty(enabledTagTags) || any((id) => contains(id, resource.tagIds), enabledTagTags);
    return (
      validTypeTags &&
      validTagTags &&
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
      <l.Centered mb={th.spacing.md} mt={th.spacing.lg}>
        <ty.H2 fontSize={th.fontSizes.h3}>Fitness Resources</ty.H2>
      </l.Centered>
      <Search search={search} setSearch={setSearch} />
      <TagSet enabledTags={enabledTypeTags} label="Type" tags={typeTags} toggleTag={toggleTypeTag} />
      <TagSet enabledTags={enabledTagTags} label="Tags" tags={tagTags} toggleTag={toggleTagTag} />
      <l.Div height={th.spacing.md} />
      <List header={`Resources (${items.length})`} columns={columns} isLoading={false} items={items} />
    </>
  );
};

export default Resources;
