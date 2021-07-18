import React, { useRef } from 'react';
import { NavLink as BaseNavLink, NavLinkProps } from 'react-router-dom';
import { usePreloading } from '../usePreloading';

type Props = {
  preloadWhenVisible?: boolean;
  preload?: boolean;
} & NavLinkProps;


const NavLink: React.FC<Props> = (props) => {

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

  return <BaseNavLink ref={anchorRef} {...props}
                   onMouseEnter={preload} />;
};

NavLink.displayName = 'BaseNavLink';

export default NavLink;
