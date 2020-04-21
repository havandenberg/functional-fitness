import { filter, find, propEq } from 'ramda';
import * as api from 'api';

export const getTags = (ids: string[], tags: api.Tag[]): any[] =>
  filter(
    (tag) => !!tag,
    ids.map((id) => find(propEq('id', id), tags)),
  );
