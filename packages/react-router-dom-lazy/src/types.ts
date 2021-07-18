import { PreloadableComponent } from './lazyWithPreload';
import { RouteProps } from 'react-router-dom';

export type ConfigAndComponent = {
  config: {
    path: RouteProps['path'];
    strict?: boolean;
    exact?: boolean;
  };
  component: PreloadableComponent<any>
  id?: string;
}


export type Config = {
  intersectionEnabled: boolean;
  overEnabled: boolean;
}
