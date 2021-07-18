import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { PreloadContext, PreloadContextConfig } from './contexts';
import { LinkProps } from 'react-router-dom';


function checkOverride(config: boolean, override: boolean | undefined) {
  if (override === undefined) {
    return config;
  } else {
    return override;
  }
}

type PreloadingConfig = {
  preloadingPath: LinkProps['to'],
  preloadEnabled?: boolean,
  elementRef?: React.MutableRefObject<HTMLElement | null>,
  preloadWhenVisible?: boolean
}

export function usePreloading({
  preloadingPath,
  preloadEnabled,
  elementRef,
  preloadWhenVisible,
}: PreloadingConfig) {
  const preloaded = useRef<boolean>(false);

  const { preloadMatchingComponents } = useContext(PreloadContext);

  const { intersectionEnabled, overEnabled } = useContext(PreloadContextConfig);

  const preload = useCallback(() => {

    console.debug('overEnabled', overEnabled, preloadingPath)
    if (overEnabled) {
      preloaded.current = true;
      if (typeof preloadingPath === 'string') {
        preloadMatchingComponents(preloadingPath);
      } else if (typeof preloadingPath === 'object') {
        preloadMatchingComponents(preloadingPath.pathname!);
      }
    }

  }, [preloadMatchingComponents, preloadingPath, overEnabled]);

  useEffect(() => {
    if (
      preloadEnabled !== false &&
      !!window.IntersectionObserver &&
      elementRef && elementRef.current &&
      checkOverride(intersectionEnabled, preloadWhenVisible)
    ) {
      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            preload();
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -200px 0px' });
      observer.observe(elementRef.current);
      return () => observer.disconnect();
    }
    return () => ({});
  }, [preloadWhenVisible, intersectionEnabled, preloadEnabled, preload, elementRef]);

  return { preload };
}
