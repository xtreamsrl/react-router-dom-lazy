import {ComponentType, createElement, forwardRef, lazy} from 'react';

export type PreloadableComponent<T extends ComponentType<any>> = T & {
  preload: () => Promise<void>;
};

const PRELOAD_DELAY = 20 * 1000;

export default function lazyWithPreload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  autoPreload: boolean = false,
): PreloadableComponent<T> {
  const LazyComponent = lazy(factory);
  let factoryPromise: Promise<void> | undefined;
  let LoadedComponent: T | undefined;

  const Component = (forwardRef(function LazyWithPreload(props, ref) {
    return createElement(
      LoadedComponent ?? LazyComponent,
      Object.assign(ref ? {ref} : {}, props) as any
    );
  }) as any) as PreloadableComponent<T>;

  Component.preload = () => {
    if (!factoryPromise) {
      factoryPromise = factory().then((module) => {
        LoadedComponent = module.default;
      });
    }

    return factoryPromise;
  };

  if (autoPreload) {
    setTimeout(factory, PRELOAD_DELAY)
  }

  return Component;
}
