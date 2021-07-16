import { PreloadableComponent } from './lazyWithPreload';

export type ConfigAndComponent = {
  config: {
    path: string;
    strict?: boolean;
    exact?: boolean;
  };
  component: PreloadableComponent<any>
}


export type Config = {
  intersectionEnabled: boolean;
  overEnabled: boolean;
}
