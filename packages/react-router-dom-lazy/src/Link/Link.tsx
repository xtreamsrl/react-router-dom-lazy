import React, { useRef } from 'react';
import { Link as BaseLink, LinkProps } from 'react-router-dom';
import { usePreloading } from '../usePreloading';

type Props = {
  preloadWhenVisible?: boolean;
  preload?: boolean;
} & LinkProps;


const Link: React.FC<Props> = (props) => {

  const anchorRef = useRef<HTMLAnchorElement>(null);

  const preloadingPath = props.to;
  const preloadEnabled = props.preload;
  const preloadWhenVisible = props.preloadWhenVisible;
  const { preload } = usePreloading({
    preloadingPath,
    preloadEnabled,
    preloadWhenVisible,
    elementRef: anchorRef,
  });

  return <BaseLink ref={anchorRef} {...props}
                   onMouseEnter={preload} />;
};

Link.displayName = 'Link';

export default Link;
