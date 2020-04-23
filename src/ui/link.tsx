import React from 'react';
import { useLocation } from 'react-router-dom';
import { AreaLink, DivProps } from 'ui/layout';
import { TextLink, TextProps } from 'ui/typography';
import { LinkProps } from 'react-router-dom';

interface CustomLinkProps {
  active?: string;
}

interface Props {
  preserveParams?: boolean;
  to: string;
  type: 'area' | 'text';
}

const Link = ({
  preserveParams = false,
  to,
  type,
  ...rest
}: Props & CustomLinkProps & LinkProps & DivProps & TextProps) => {
  const { search } = useLocation();
  const toWithParams = {
    pathname: to,
    search: preserveParams ? search : undefined,
  };
  switch (type) {
    case 'text':
      return <TextLink to={toWithParams} {...rest} />;
    default:
      return <AreaLink to={toWithParams} {...rest} />;
  }
};

export default Link;
