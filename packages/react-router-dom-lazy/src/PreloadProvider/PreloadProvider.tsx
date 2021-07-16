import React, { useCallback, useMemo } from 'react';
import { PreloadContext, PreloadContextSetter } from '../contexts';
import { Config, ConfigAndComponent } from '../types';
import useStateWithRef from '../useStateWithRef';
import { matchPath } from 'react-router';
import PreloadConfig from '../PreloadConfig';

type Props = {
  config?: Config;
};

const PreloadProvider: React.FC<Props> = ({ children, config }) => {

  const [_, setComponentsConfigs, componentsConfigsRef] = useStateWithRef<ConfigAndComponent[]>([]);

  const registerComponent = useCallback((config: ConfigAndComponent) => {
    console.debug('registering component', config);
    setComponentsConfigs(currentMap => ([...currentMap, config]));
  }, []);

  const contextSetterValue = useMemo(() => ({
    registerComponent,
  }), [registerComponent]);

  const preloadMatchingComponents = useCallback((goingPath: string) => {
    for (const comp of componentsConfigsRef.current) {
      if (matchPath(goingPath, comp.config)) {
        void comp.component.preload();
      }
    }
  }, []);

  const contextMatchingValue = useMemo(() => ({
    preloadMatchingComponents,
  }), [preloadMatchingComponents]);

  return (
    <PreloadContext.Provider value={contextMatchingValue}>
      <PreloadContextSetter.Provider value={contextSetterValue}>
        <PreloadConfig config={config}>
          {children}
        </PreloadConfig>
      </PreloadContextSetter.Provider>
    </PreloadContext.Provider>
  );
};

PreloadProvider.displayName = 'PreloadProvider';

export default PreloadProvider;
