import { useCallback, useState } from 'react';
import { contains } from 'ramda';
import * as api from 'api';

export const useEnabledTagSet = (tagSet: api.Tag[]) => {
  const [enabledTags, setEnabledTags] = useState<string[]>([]);
  const toggleTag = useCallback(
    (id: string) => {
      if (contains(id, enabledTags)) {
        setEnabledTags(enabledTags.filter((tagId) => tagId !== id));
      } else if (enabledTags.length + 1 === tagSet.length) {
        setEnabledTags([]);
      } else {
        setEnabledTags([...enabledTags, id]);
      }
    },
    [enabledTags, setEnabledTags, tagSet.length],
  );
  return [enabledTags, toggleTag] as const;
};
