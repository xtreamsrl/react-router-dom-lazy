import { ComponentType, useContext, useEffect } from 'react';
import { Route as RouterDomRoute, RouteProps } from 'react-router-dom';
import { PreloadableComponent } from '../lazyWithPreload';
import { PreloadContextSetter } from '../contexts';

type Props<T extends ComponentType<any>> = {
  component: PreloadableComponent<T>
  path: string;
} & Omit<RouteProps, | 'component' | 'render' | 'path'>;

const Route = <T extends ComponentType<any>>(props: Props<T>) => {

  const { registerComponent } = useContext(PreloadContextSetter);

  useEffect(() => {
    const unregister = registerComponent({
      component: props.component,
      config: {
        path: props.path,
        exact: props.exact,
        strict: props.strict,
      },
    });
    return unregister;
  }, [props.path, props.component, props.path, props.strict, registerComponent]);

  return (
    <RouterDomRoute {...props} />
  );
};

Route.displayName = 'Route';

export default Route;
