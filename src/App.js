import React from 'react';
import { App as AppOnRelease } from './app-on-release/App';
import { App as AppOnTimeout } from './app-on-timeout/App';
import { App as AppOnThreshold } from './app-on-threshold/App';
// import { App as AppOnGC } from './app-on-gc/App';

export const App = () => {
  return (
    <div>
      <h2 style={{ color: "orange" }}>Use phone mode (with touch) for a better understanding</h2>
      <AppOnThreshold />
      {/* <AppOnGC /> */}
      <AppOnRelease />
      <AppOnTimeout />
    </div>
  )
}