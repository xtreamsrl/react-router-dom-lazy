import React, { useContext, useEffect, useRef } from 'react';
import { Link as BaseLink, LinkProps } from 'react-router-dom';
import { PreloadContext, PreloadContextConfig } from '../contexts';

type Props = {
  preloadWhenVisible?: boolean;
  preload?: boolean;
} & LinkProps;


function check(config: boolean, override: boolean | undefined) {
  if (override === undefined) {
    return config;
  } else {
    return override;
  }
}

const Link: React.FC<Props> = (props) => {

  const preloaded = useRef<boolean>(false);

  const anchorRef = useRef<HTMLAnchorElement>(null);

  const { preloadMatchingComponents } = useContext(PreloadContext);

  const { intersectionEnabled, overEnabled } = useContext(PreloadContextConfig);

  const preload = () => {

    if (overEnabled) {
      preloaded.current = true;
      if (typeof props.to === 'string') {
        preloadMatchingComponents(props.to);
      } else if (typeof props.to === 'object') {
        preloadMatchingComponents(props.to.pathname!);
      }
    }

  };

  useEffect(() => {
    if (props.preload !== false && !!window.IntersectionObserver && anchorRef.current &&
      check(intersectionEnabled, props.preloadWhenVisible)
    ) {
      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            preload();
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -200px 0px' });
      observer.observe(anchorRef.current);
      return () => observer.disconnect();
    }
    return () => ({});
  }, [props.preloadWhenVisible, intersectionEnabled, props.preload]);

  return <BaseLink ref={anchorRef} {...props}
                   onMouseEnter={preload} />;
};

Link.displayName = 'Link';

export default Link;
