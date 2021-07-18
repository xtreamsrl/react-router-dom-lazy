import React, { useContext, useEffect, useMemo } from 'react';
import { Route, RouteProps, Switch as SwitchBase } from 'react-router-dom';
import { ConfigAndComponent } from '../types';
import { PreloadContextSetter } from '../contexts';

type Props = {
  children: React.ReactElement[];
};

const Switch: React.FC<Props> = ({ children }) => {
  const { registerComponent } = useContext(PreloadContextSetter);

  const routesConfig = useMemo(() => {
    const routesConfig: ConfigAndComponent[] = [];
    React.Children.forEach(children, child => {
      if (React.isValidElement(child)) {
        if (child.type === Route) {
          const props = child.props as RouteProps;
          routesConfig.push({
            component: props.component,
            config: {
              exact: props.exact,
              strict: props.strict,
              path: props.path,
            },
          });
        }
      }
    });
    return routesConfig;
  }, [children]);

  useEffect(() => {
    const unregisters = routesConfig.map(c => registerComponent(c));
    return () => unregisters.forEach(f => f());
  }, [routesConfig]);

  return React.createElement(SwitchBase, null, ...children);
};

Switch.displayName = 'Switch';

export default Switch;
