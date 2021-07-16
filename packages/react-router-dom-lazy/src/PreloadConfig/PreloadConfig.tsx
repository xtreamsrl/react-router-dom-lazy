import React, { useMemo } from 'react';
import { PreloadContextConfig } from '../contexts';
import { Config } from '../types';

type Props = {
  config?: Partial<Config>;
};

function boolDefault(value: boolean | undefined, defaultValue: boolean) {
  if (typeof value === 'undefined') {
    return defaultValue;
  } else {
    return value;
  }
}

const PreloadConfig: React.FC<Props> = ({ config, children }) => {

  const intersectionEnabled = boolDefault(config?.intersectionEnabled, true);
  const overEnabled = boolDefault(config?.overEnabled, true);

  const actualConfig = useMemo(() => ({
    intersectionEnabled,
    overEnabled,
  }), [intersectionEnabled, overEnabled]);

  return (
    <PreloadContextConfig.Provider value={actualConfig}>
      {children}
    </PreloadContextConfig.Provider>
  );
};

PreloadConfig.displayName = 'PreloadConfig';

export default PreloadConfig;
