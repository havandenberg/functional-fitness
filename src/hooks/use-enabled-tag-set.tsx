import { useCallback, useState } from 'react';
import { contains } from 'ramda';

export const useEnabledTagSet = () => {
  const [enabledTags, setEnabledTags] = useState<string[]>([]);
  const toggleTag = useCallback(
    (id: string) => {
      if (contains(id, enabledTags)) {
        setEnabledTags(enabledTags.filter((tagId) => tagId !== id));
      } else {
        setEnabledTags([...enabledTags, id]);
      }
    },
    [enabledTags, setEnabledTags],
  );
  return [enabledTags, toggleTag] as const;
};
