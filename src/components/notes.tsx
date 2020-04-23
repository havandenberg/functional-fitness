import React from 'react';
import styled from '@emotion/styled';
import * as api from 'api';
import { isEmpty } from 'ramda';
import { Index } from 'components/list/item';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';

const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const Text = styled(ty.Text)({
  whiteSpace: 'normal',
});

const Notes = ({ live, notes }: { live?: boolean; notes: api.Notes }) => {
  const hasLevels = typeof notes !== 'string';
  if (isEmpty(notes)) {
    return null;
  }
  return (
    <>
      <ty.Label mb={th.spacing.sm}>Notes</ty.Label>
      {hasLevels ? (
        <>
          {(notes as api.Level[]).map((level: api.Level, idx: number) => (
            <l.Flex mb={idx === notes.length - 1 ? undefined : th.spacing.md}>
              <Index expanded bg={th.colors.brand.secondary} mr="12px" mt="5px">
                {numerals[idx]}
              </Index>
              <div>
                <Text
                  color={live ? th.colors.white : undefined}
                  fontWeight={th.fontWeights.semiBold}
                  mb={th.spacing.sm}
                >
                  {level.name}
                </Text>
                <Text color={live ? th.colors.white : undefined}>{level.notes}</Text>
              </div>
            </l.Flex>
          ))}
        </>
      ) : (
        <Text color={live ? th.colors.white : undefined}>{notes}</Text>
      )}
    </>
  );
};

export default Notes;
