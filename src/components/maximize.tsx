import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import maximizeImg from 'assets/images/maximize.svg';
import Modal from 'components/modal';
import l from 'ui/layout';
import th from 'ui/theme';

export const Icon = styled(l.Img)({
  background: th.colors.white,
  height: '12px',
  right: 0,
  padding: th.spacing.tn,
  position: 'absolute',
});

const Maximize = ({ content, toggle }: { content: React.ReactNode; toggle: React.ReactNode }) => {
  useEffect(() => {
    return () => {
      clearAllBodyScrollLocks();
    };
  });
  return (
    <Modal
      toggle={(show) => (
        <l.Div
          onClick={(e) => {
            e.stopPropagation();
            if (document.body) {
              disableBodyScroll(document.body);
            }
            show();
          }}
          position="relative"
        >
          {toggle}
          <Icon src={maximizeImg} />
        </l.Div>
      )}
      content={() => content}
    />
  );
};

export default Maximize;
