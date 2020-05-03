import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { any } from 'ramda';
import collapseAllImg from 'assets/images/collapse-all.svg';
import expandAllImg from 'assets/images/expand-all.svg';
import Loading from 'components/loading';
import Item, { ColumnData, INDEX_BASIS, ItemData, EXPAND_BASIS, TO_BASIS } from 'components/list/item';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

const Action = styled(l.FlexCentered)({
  ':hover': {
    background: th.colors.brand.primaryHighlight,
  },
  borderRadius: th.borderRadii.input,
  cursor: 'pointer',
  padding: th.spacing.sm,
  transition: th.transitions.default,
});

const Grid = styled(l.Div)({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  width: th.sizes.fill,
});

interface Props {
  columns: ColumnData[];
  header?: string;
  isLoading: boolean;
  items: ItemData[];
  showIndices?: boolean;
}

const List = ({ columns, header, isLoading, items, showIndices }: Props) => {
  const [expanded, setExpanded] = useState<boolean[]>(items.map(() => false));

  const toggleExpanded = (index: number) => setExpanded(expanded.map((value, idx) => (index === idx ? !value : value)));
  const collapseAll = () => setExpanded(expanded.map(() => false));
  const expandAll = () => setExpanded(expanded.map(() => true));

  const hasContent = any((item) => !!item.content, items);
  const hasTo = any((item) => !!item.to, items);

  useEffect(collapseAll, [items.length]);

  return (
    <l.Div mb={th.spacing.xl}>
      {header && (
        <l.FlexBetween mb={th.spacing.md} mx={th.spacing.sm}>
          <ty.Text size="large">{header}</ty.Text>
          {hasContent && (
            <l.Flex>
              <Action mr={th.spacing.sm} onClick={collapseAll}>
                <l.Img src={collapseAllImg} />
              </Action>
              <Action onClick={expandAll}>
                <l.Img src={expandAllImg} />
              </Action>
            </l.Flex>
          )}
        </l.FlexBetween>
      )}
      <Grid>
        <l.Flex bdb={th.borders.input}>
          {showIndices && <l.Div flexBasis={INDEX_BASIS + 4} />}
          {columns.map((col) => (
            <l.Div {...col.styles} key={col.title} mb={th.spacing.tn} pl={th.spacing.sm}>
              <ty.Label flex={1}>{col.title}</ty.Label>
            </l.Div>
          ))}
          {hasContent && <l.Div flexBasis={EXPAND_BASIS} />}
          {hasTo && <l.Div flexBasis={TO_BASIS} />}
        </l.Flex>
        {isLoading ? (
          <Loading />
        ) : (
          items.map((item, idx) => (
            <Item
              columnsInfo={columns}
              expanded={expanded[idx]}
              index={idx}
              key={`${item.id}-${idx}`}
              showIndices={showIndices}
              toggleExpanded={() => toggleExpanded(idx)}
              {...item}
            />
          ))
        )}
      </Grid>
    </l.Div>
  );
};

export default List;
