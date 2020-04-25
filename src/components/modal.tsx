import React, { useState } from 'react';
import styled from '@emotion/styled';
import { enableBodyScroll } from 'body-scroll-lock';
import ReactDOM from 'react-dom';
import closeImg from 'assets/images/close.svg';
import l from 'ui/layout';
import th from 'ui/theme';

export const ROOT_MODAL_ID = 'modal-root';

const Close = styled(l.Img)({
  height: 12,
  position: 'absolute',
  right: th.spacing.md,
  top: th.spacing.md,
});

const Overlay = styled(l.Flex)({
  background: th.colors.overlay,
  height: th.sizes.fill,
  left: 0,
  position: 'fixed',
  top: 0,
  width: th.sizes.fill,
  zIndex: 1100,
});

const StyledModal = styled(l.Div)({
  borderRadius: th.borderRadii.input,
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  margin: `0 ${th.spacing.md} ${th.spacing.md}`,
  maxHeight: `calc(${th.sizes.fill} - 56px)`,
  position: 'absolute',
  top: 40,
  width: `calc(${th.sizes.fill} - ${th.spacing.lg})`,
});

const ModalContent = ({ children, hide }: { children: React.ReactNode; hide: () => void }) => {
  const modalNode = document.getElementById(ROOT_MODAL_ID);
  return modalNode
    ? ReactDOM.createPortal(
        <Overlay
          onClick={(e) => {
            e.stopPropagation();
            if (document.body) {
              enableBodyScroll(document.body);
            }
            hide();
          }}
        >
          <Close src={closeImg} />
          <StyledModal>{children}</StyledModal>
        </Overlay>,
        modalNode,
      )
    : null;
};

interface Props {
  content: (setIsShown: () => void) => React.ReactNode;
  toggle: (setIsShown: () => void) => React.ReactNode;
}

const Modal = ({ content, toggle }: Props) => {
  const [isShown, setIsShown] = useState(false);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);

  return (
    <>
      {toggle(show)}
      {isShown && <ModalContent hide={hide}>{content(hide)}</ModalContent>}
    </>
  );
};

export default Modal;
