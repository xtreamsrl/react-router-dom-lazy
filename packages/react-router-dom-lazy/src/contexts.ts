import React from 'react';
import { Config, ConfigAndComponent } from './types';

export const PreloadContext = React.createContext<{
  preloadMatchingComponents: (path: string) => void;
}>({
  preloadMatchingComponents: () => ({}),
});

export const PreloadContextSetter = React.createContext<{
  registerComponent: (config: ConfigAndComponent) => void
}>({
  registerComponent: () => ({}),
});

export const PreloadContextConfig = React.createContext<Config>({
  intersectionEnabled: true,
  overEnabled: true,
});
