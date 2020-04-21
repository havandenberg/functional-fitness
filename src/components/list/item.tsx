import React from 'react';
import styled from '@emotion/styled';
import detailsImg from 'assets/images/details.svg';
import expandImg from 'assets/images/expand.svg';
import collapseImg from 'assets/images/collapse.svg';
import l, { DivProps } from 'ui/layout';
import th from 'ui/theme';

const ToggleExpand = styled(l.FlexColumnCentered)<{ expanded?: boolean }>(({ expanded }) => ({
  alignSelf: expanded ? 'start' : 'center',
  flexBasis: 40,
  marginTop: expanded ? 20 : undefined,
  transform: expanded ? undefined : 'translate(-4px)',
}));

export interface ColumnData {
  title: string;
  styles: DivProps;
  scroll?: false;
}

export interface ItemData {
  columns: React.ReactNode[];
  content?: React.ReactNode;
  id: string;
  to?: string;
}

type ItemProps = ItemData & {
  columnsInfo: ColumnData[];
  expanded: boolean;
  index: number;
  toggleExpanded: () => void;
};

const Cell = styled(l.Div)<{ scroll?: boolean }>(
  {
    alignItems: 'center',
    display: 'inline-flex',
    overflow: 'hidden',
    padding: `${th.spacing.sm} 0`,
    whiteSpace: 'nowrap',
  },
  ({ scroll }) =>
    scroll
      ? {
          ...th.scrollStyles(false),
          overflowX: 'auto',
        }
      : {},
);

const wrapperStyles = [
  {
    borderBottom: th.borders.input,
    display: 'flex',
    width: th.sizes.fill,
  },
  ({ index }: { index: number }) => ({
    background: index % 2 === 0 ? th.colors.background : th.colors.lightGray,
  }),
];

const LinkWrapper = styled(l.AreaLink)(wrapperStyles);
const DivWrapper = styled(l.Div)(wrapperStyles);

const Item = ({ columns, columnsInfo, content, expanded, id, index, to = '#', toggleExpanded }: ItemProps) => {
  const Component = to === '#' ? DivWrapper : LinkWrapper;
  return (
    <Component index={index} onClick={content ? toggleExpanded : undefined} to={to} type="area">
      {content && expanded
        ? content
        : columns.map((col, i) => (
            <Cell
              {...columnsInfo[i].styles}
              key={`${id}${i}`}
              ml={th.spacing.md}
              scroll={columnsInfo[i].scroll === undefined || columnsInfo[i].scroll}
            >
              {col}
            </Cell>
          ))}
      {to !== '#' && (
        <l.FlexColumnCentered flexBasis={20} pr={th.spacing.tn}>
          <l.Img src={detailsImg} />
        </l.FlexColumnCentered>
      )}
      {content && (
        <ToggleExpand expanded={expanded}>
          <l.Img src={expanded ? collapseImg : expandImg} />
        </ToggleExpand>
      )}
    </Component>
  );
};

export default Item;
