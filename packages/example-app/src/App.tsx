import React, { Suspense } from 'react';
import { lazyWithPreload, Link, PreloadConfig, PreloadingSwitch as Switch, Route } from 'react-router-dom-lazy';
import CustomButtonLink from './CustomButtonLink';

const PageA = lazyWithPreload(() => import('./PageA'));
const PageB = lazyWithPreload(() => import('./PageB'));
const PageC = lazyWithPreload(() => import('./PageC'));
const PageD = lazyWithPreload(() => import('./PageD'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <Switch>
          <Route exact
                     path="/">
            <PreloadConfig config={{ intersectionEnabled: false }}>
              <Link to="/a">
                a
              </Link>
              <Link to="/b">
                b
              </Link>
              <CustomButtonLink path="/d"
                                label="link to d" />
            </PreloadConfig>
            <div style={{ height: '1500px' }}>

            </div>
            <Link to="/c">
              c
            </Link>
            <CustomButtonLink path="/d"
                              label="link to d" />
            <div style={{ height: '300px' }}>

            </div>
          </Route>
          <Route component={PageA}
                 path="/a" />
          <Route component={PageB}
                 path="/b" />
          <Route component={PageC}
                 path="/c" />
          <Route component={PageD}
                 path="/d" />
        </Switch>
      </Suspense>

    </div>
  );
}

export default App;
