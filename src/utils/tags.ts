import { filter, find, prop, propEq, sortBy } from 'ramda';
import * as api from 'api';

export const getTags = (ids: string[], tags: api.Tag[]): any[] =>
  sortBy(
    prop('text'),
    filter(
      (tag) => !!tag,
      ids.map((id) => find(propEq('id', id), tags)),
    ) as api.Tag[],
  );
