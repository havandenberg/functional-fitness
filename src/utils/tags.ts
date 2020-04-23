import { filter, find, flatten, pluck, prop, propEq, sortBy, uniq } from 'ramda';
import * as api from 'api';

export const findItemsByIds = <T extends { id: string }>(ids: string[], items: T[]): T[] =>
  filter(
    (tag) => !!tag,
    ids.map((id) => find(propEq('id', id), items)),
  ) as T[];

export const getTags = (ids: string[], tags: api.Tag[]): api.Tag[] =>
  sortBy(prop('text'), findItemsByIds<api.Tag>(ids, tags) as api.Tag[]);

export const getAllTags = <T>(type: string, items: T[], tags: api.Tag[]): api.Tag[] =>
  getTags(uniq(flatten(pluck(type, items as any[]))), tags);
