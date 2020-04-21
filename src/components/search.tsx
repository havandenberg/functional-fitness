import React from 'react';
import i from 'ui/input';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

interface Props {
  search: string;
  setSearch: (search: string) => void;
}

const Search = ({ search, setSearch }: Props) => (
  <l.Div mb={th.spacing.md} mx={th.spacing.md}>
    <ty.Label mb={th.spacing.tn}>Search</ty.Label>
    <l.FlexCentered>
      <i.Default
        flex={1}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        value={search}
      />
    </l.FlexCentered>
  </l.Div>
);

export default Search;
