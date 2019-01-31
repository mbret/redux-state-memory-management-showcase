import React from 'react';
import { Provider } from 'react-redux'
import { List } from '../List';
import { connect } from 'react-redux';
import { sizeof } from '../utils';
import { fetchEntities, activeHolders, store } from './store';

const _AppInfo = ({ stateSize, nbEntities, nbHolders }) => (
  <div style={{ paddingBottom: 10 }}>
    <h3>App on release</h3>
    <table>
      <tbody>
        <tr><td>State size</td><td>{stateSize}</td></tr>
        <tr><td>Entity loaded</td><td>{nbEntities}</td></tr>
        <tr><td>holder active</td><td>{nbHolders}</td></tr>
      </tbody>
    </table>
  </div>
)

export const AppInfo = connect(state => ({
  stateSize: sizeof.format(sizeof.sizeof(state)),
  nbEntities: Object.keys(state.entities.byId).length,
  nbHolders: activeHolders(state),
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