import React from 'react';
import { Provider } from 'react-redux'
import { List } from '../List';
import { connect } from 'react-redux';
import { sizeof } from '../utils';
import { fetchEntities, activeHolders, store, thresholdLoad } from './store';

const _AppInfo = ({ stateSize, nbEntities, nbHolders, thresholdLoad, threshold }) => (
  <div style={{ paddingBottom: 10 }}>
    <h3>App on threshold</h3>
    <table>
      <tbody>
        <tr><td>State size</td><td>{stateSize}</td></tr>
        <tr><td>Entity loaded</td><td>{nbEntities}</td></tr>
        <tr><td>holder active</td><td>{nbHolders}</td></tr>
        <tr><td>Threshold load</td><td>{thresholdLoad} on ({threshold})</td></tr>
      </tbody>
    </table>
  </div>
)

export const AppInfo = connect(state => ({
  stateSize: sizeof.format(sizeof.sizeof(state)),
  nbEntities: Object.keys(state.entities.byId).length,
  nbHolders: activeHolders(state),
  thresholdLoad: thresholdLoad(state),
  threshold: state.retention.threshold,
}))(_AppInfo)

export class App extends React.Component {
  componentDidMount () {
    store.dispatch(fetchEntities())
  }

  render () {
    return (
      <Provider store={store}>
        <AppInfo />
        <List />
      </Provider>
    )
  }
}