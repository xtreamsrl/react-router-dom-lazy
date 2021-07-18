import React, { useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { usePreloading } from 'react-router-dom-lazy';

type Props = {
  path: string;
  label: string;
  preloadWhenVisible?: boolean;
};

const CustomButtonLink: React.FC<Props> = ({
  label,
  path,
  preloadWhenVisible,
}) => {

  const ref = useRef<HTMLButtonElement>(null);

  const { preload } = usePreloading({
    elementRef: ref,
    preloadingPath: path,
    preloadWhenVisible,
  });

  const history = useHistory();

  const onClick = () => history.push(path);

  return (
    <button ref={ref}
            onMouseEnter={preload}
            onClick={onClick}>
      {label}
    </button>
  );
};

CustomButtonLink.displayName = 'CustomButtonLink';

export default CustomButtonLink;
