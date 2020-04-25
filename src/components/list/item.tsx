import React from 'react';
import styled from '@emotion/styled';
import detailsImg from 'assets/images/details.svg';
import expandImg from 'assets/images/expand.svg';
import collapseImg from 'assets/images/collapse.svg';
import l, { DivProps } from 'ui/layout';
import th from 'ui/theme';
import { scrollToId } from 'ui/utils';

export const EXPAND_BASIS = 30;
export const INDEX_BASIS = 10;
export const TO_BASIS = 20;

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

export const Index = styled(l.Centered)<{ expanded?: boolean }>(
  {
    borderRadius: th.borderRadii.circle,
    color: th.colors.white,
    fontSize: 9,
    fontWeight: th.fontWeights.bold,
    height: th.sizes.xs,
    marginLeft: 6,
    maxHeight: th.sizes.xs,
    maxWidth: th.sizes.xs,
    minHeight: th.sizes.xs,
    minWidth: th.sizes.xs,
    width: th.sizes.xs,
  },
  ({ expanded }) => ({
    alignSelf: expanded ? 'start' : 'center',
  }),
);

const IndexWrapper = styled(l.Centered)<{ expanded?: boolean }>(({ expanded }) => ({
  alignSelf: expanded ? 'start' : 'center',
  flexBasis: INDEX_BASIS,
  marginTop: expanded ? 16 : undefined,
}));

const ToggleExpand = styled(l.Centered)<{ expanded?: boolean }>(({ expanded }) => ({
  alignSelf: expanded ? 'start' : 'center',
  flexBasis: EXPAND_BASIS,
  marginTop: expanded ? 20 : undefined,
}));

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
  showIndices?: boolean;
  toggleExpanded: () => void;
};

const Item = ({
  columns,
  columnsInfo,
  content,
  expanded,
  id,
  index,
  showIndices,
  to = '#',
  toggleExpanded,
}: ItemProps) => {
  const Component = to === '#' ? DivWrapper : LinkWrapper;
  return (
    <Component
      id={id}
      index={index}
      onClick={
        content
          ? () => {
              toggleExpanded();
              scrollToId(id);
            }
          : undefined
      }
      to={to}
      type="area"
    >
      {showIndices && (
        <IndexWrapper expanded={expanded}>
          <Index bg={th.colors.black}>{index + 1}</Index>
        </IndexWrapper>
      )}
      {content && expanded ? (
        <Cell flex={1} ml={showIndices ? th.spacing.sm : th.spacing.md}>
          {content}
        </Cell>
      ) : (
        columns.map((col, i) => (
          <Cell
            {...columnsInfo[i].styles}
            key={`${id}${i}`}
            ml={showIndices && !i ? th.spacing.sm : th.spacing.md}
            scroll={columnsInfo[i].scroll === undefined || columnsInfo[i].scroll}
          >
            {col}
          </Cell>
        ))
      )}
      {to !== '#' && (
        <l.Centered flexBasis={TO_BASIS} pr={th.spacing.tn}>
          <l.Img src={detailsImg} />
        </l.Centered>
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
