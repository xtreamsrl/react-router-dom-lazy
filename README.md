# react-router-dom-lazy
A lazy aware version of react router DOM.

## Why

SPA are great but bundle easily become huge. Lazy loading can mitigate
the problem but you loose responsiveness. Preloading components 
can workaround this.

react-router-dom-lazy solves this problem by making the routing
and navigation aware of lazy loadable components and preloads
them if you hover a link enters the viewport, or you move the mouse
on a link. This anticipates the loading from navigation time improving
application responsiveness.

## How to use

The api is identical to `react-router-dom` so you just need to 
change the import.


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

You need to use `lazyWithPreload` instead of lazy. This function wraps
`React.lazy`, attaching an imperative load function.

```typescript
import { lazyWithPreload } from 'react-router-dom-lazy';

const A = lazyWithPreload(() => import('./ComponentA'));

```

### Configure Route

```tsx
import { Route, lazyWithPreload, Switch } from 'react-router-dom-lazy';

const A = lazyWithPreload(() => import('./ComponentA'));

...
return (
  <Suspense>

      <Switch>
        <Route component={A}
               path="/a" />
      </Switch>
    </Suspense>
);

```

### Link

Link is exactly the same as react-router-dom plus you can disable 
preloading or change preloading behaviour at link level

```tsx
import { Link } from 'react-router-dom-lazy';

<Link to="/a">
  a
</Link>
```

```tsx
import { Link } from 'react-router-dom-lazy';

<Link to="/a" preload={false}>
  a
</Link>
```

```tsx
import { Link } from 'react-router-dom-lazy';

<Link to="/a" preloadWhenVisible={false}>
  a
</Link>
```

### Override config on specific tree
If you ara in a menu section, and you want to avoid that all the links 
visible will be preloaded instantly you can override preloading
props at any point in the tree


```tsx

<PreloadConfig config={{ intersectionEnabled: false }}>
  <Link to="/a">
    a
  </Link>
</PreloadConfig>
```
