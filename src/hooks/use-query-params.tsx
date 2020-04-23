import { useCallback } from 'react';
import { DecodedValueMap, QueryParamConfigMap, StringParam, useQueryParams } from 'use-query-params';

const liveParamSet = { liveId: StringParam };

const useQuerySet = <QPCMap extends QueryParamConfigMap>(paramSet: QPCMap) => {
  const [query, setQuery] = useQueryParams(paramSet);
  const updateQuery = useCallback(
    (newQuery: Partial<DecodedValueMap<QPCMap>>) => {
      setQuery(newQuery, 'pushIn');
    },
    [setQuery],
  );
  return [query, updateQuery] as const;
};

export const useLiveQueryParams = () => useQuerySet(liveParamSet);
