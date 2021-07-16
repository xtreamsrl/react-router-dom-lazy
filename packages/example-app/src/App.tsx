import React, { Suspense } from 'react';
import { lazyWithPreload, Link, PreloadConfig, Route } from 'react-router-dom-lazy';
import { Route as BaseRoute } from 'react-router-dom';

const A = lazyWithPreload(() => import('./ModuleA'));
const B = lazyWithPreload(() => import('./ModuleB'));
const C = lazyWithPreload(() => import('./ModuleC'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <BaseRoute exact
                   path="/">
          <PreloadConfig config={{ intersectionEnabled: false }}>
            <Link to="/a">
              a
            </Link>
            <Link to="/b">
              b
            </Link>
          </PreloadConfig>
          <div style={{ height: '1500px' }}>

          </div>
          <Link to="/c">
            c
          </Link>
          <div style={{ height: '300px' }}>

          </div>
        </BaseRoute>
        <Route component={A}
               path="/a" />
        <Route component={B}
               path="/b" />
        <Route component={C}
               path="/c" />
      </Suspense>

    </div>
  );
}

export default App;
