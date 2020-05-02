import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import l from 'ui/layout';
import th from 'ui/theme';

interface Props {
  padding?: string;
}

const Loading = ({ padding }: Props) => (
  <l.FlexCentered p={padding || th.spacing.lg}>
    <ClipLoader size={th.sizes.md} color={th.colors.gray} />
  </l.FlexCentered>
);

export default Loading;
