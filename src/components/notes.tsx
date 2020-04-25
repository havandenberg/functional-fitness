import React from 'react';
import styled from '@emotion/styled';
import * as api from 'api';
import { Index } from 'components/list/item';
import l from 'ui/layout';
import th from 'ui/theme';
import ty from 'ui/typography';
import { getStatusColors, numerals } from 'ui/utils';

const Text = styled(ty.Text)({
  whiteSpace: 'normal',
});

const Notes = ({ color = th.colors.text.default, notes }: { color?: string; notes: api.Notes }) => {
  const hasLevels = typeof notes !== 'string';
  const colors = hasLevels ? getStatusColors(notes.length) : [];
  return (
    <>
      <ty.Label mb={th.spacing.sm}>Notes</ty.Label>
      {hasLevels ? (
        <>
          {(notes as api.Level[]).map((level: api.Level, idx: number) => (
            <l.Flex key={idx} mb={idx === notes.length - 1 ? undefined : th.spacing.md}>
              <Index expanded bg={colors[idx]} mr="12px" mt="5px">
                {numerals[idx]}
              </Index>
              <div>
                <Text color={color} fontWeight={th.fontWeights.semiBold} mb={th.spacing.sm}>
                  {level.name}
                </Text>
                <Text color={color}>{level.notes}</Text>
              </div>
            </l.Flex>
          ))}
        </>
      ) : (
        <Text color={color}>{notes}</Text>
      )}
    </>
  );
};

export default Notes;
