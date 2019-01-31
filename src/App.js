import React from 'react';
import { App as AppOnRelease } from './app-on-release/App';
import { App as AppOnTimeout } from './app-on-timeout/App';
import { App as AppOnThreshold } from './app-on-threshold/App';
// import { App as AppOnGC } from './app-on-gc/App';

export const App = () => {
  return (
    <div>
      {/* <AppOnGC /> */}
      <AppOnRelease />
      <AppOnTimeout />
      <AppOnThreshold />
    </div>
  )
}