# react-router-dom-lazy
A lazy-loading aware version of react router DOM.

## Why

SPA are great but bundle easily become huge. Lazy loading can mitigate
the problem, but you loose responsiveness. Preloading components 
can workaround this.

react-router-dom-lazy solves this problem by making the routing
and navigation aware of lazy loadable components and preloads
them if a link enters the viewport, or you hover it. This anticipates the 
loading before navigation time, improving application responsiveness.

## How to use


```shell
npm i --save react-router-dom-lazy
```

Most of the apis are identical to `react-router-dom` so you just need to 
change the import to start using it.


### Provider

You need to wrap the application with the Provider

```jsx 

import { PreloadProvider } from 'react-router-dom-lazy';

ReactDOM.render(
    <React.StrictMode>
        <PreloadProvider>
            <Router>
                <App />
            </Router>
        </PreloadProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

```

### Importing a component

To import a lazy component page use `lazyWithPreload` instead of lazy. This function wraps
`React.lazy`, adding an imperative load function.

```typescript
import { lazyWithPreload } from 'react-router-dom-lazy';

const PageA = lazyWithPreload(() => import('./PageA'));

```
### Configure Route in Switch

react-router [does not support non direct-child](https://github.com/ReactTraining/react-router/issues/5785) 
route component at v5 inside a switch. If you want to use a switch with preloadable routes
you need to import a Switch wrapper from `react-router-dom-lazy`;

```tsx
import { lazyWithPreload, PreloadingSwitch as Switch } from 'react-router-dom-lazy';
import { Route } from 'react-router-dom';

const PageA = lazyWithPreload(() => import('./PageA'));
const PageB = lazyWithPreload(() => import('./PageB'));

...
return (
  <Suspense>

      <Switch>
        <Route component={PageA}
               path="/a" />
        <Route component={PageB}
               path="/b" />
      </Switch>
    </Suspense>
);

```

### Configuration without a switch

Configure your routing the way you are used to! You can not use render
and children as in `react-router-dom`, because they will not use preloading.

```tsx
import { lazyWithPreload, Switch } from 'react-router-dom-lazy';
import { Route } from 'react-router-dom';

const PageA = lazyWithPreload(() => import('./PageA'));
const PageB = lazyWithPreload(() => import('./PageB'));

...
return (
  <Suspense>

      <Switch>
        <Route component={PageA}
               path="/a" />
        <Route component={PageB}
               path="/b" />
      </Switch>
    </Suspense>
);

```

### Link

Link is exactly the same as react-router-dom plus you can disable 
preloading or change preloading behaviour at link level. By default, 
link is the preloading starting point: based on the viewport visibility of it
and by onHover.

```tsx
import { Link } from 'react-router-dom-lazy';

<Link to="/a">
  a
</Link>
```
You can completely disable preloading of a link.

```tsx
import { Link } from 'react-router-dom-lazy';

<Link to="/a" preload={false}>
  a
</Link>
```
Or you can disable just a behaviour, for a page that is maybe less visited by
the user, it is not necessary to load it when the link become visibile, and you can keep 
the hover only.
```tsx
import { Link } from 'react-router-dom-lazy';

<Link to="/a" preloadWhenVisible={false}>
  a
</Link>
```

### Override config on specific sub-tree
If you are in a menu section, and you want to avoid that all the links 
visible will be preloaded instantly, you can override preloading
props at any point in the tree, and all the children will use that config


```tsx

<PreloadConfig config={{ intersectionEnabled: false }}>
  <Link to="/a">
    a
  </Link>
</PreloadConfig>
```

### Manual preloading usage using hook

Do you have a custom link component? do you want to use preloading in a custom way?
No problem we got this case covered by exposing a preloading hook that you can use
wherever you want
