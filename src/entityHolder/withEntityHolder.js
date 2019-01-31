import React from 'react'
import { connect } from 'react-redux';

export const withEntityHolder = /* (getHolderState) => */ (Comp) => {
  class WithEntityHolder extends React.Component {
    componentDidMount () {
      // console.log('WithEntityHolder.componentDidMount', this.props.id, `watcher:${getHolderState(this.props.state)[this.props.id] + 1}`)

      // prepare id
      this.props.dispatch({ type: '@entityHolder/RETRIEVE_ENTITY', payload: this.props.id })
    }

    componentWillUnmount () {
      // console.log('WithEntityHolder.componentWillUnmount', this.props.id, `watcher:${getHolderState(this.props.state)[this.props.id] - 1}`)

      // release entity
      this.props.dispatch({ type: '@entityHolder/RELEASE_ENTITY', payload: this.props.id })
    }

    render () {
      return <Comp {...this.props} />
    }
  }

  return connect((state) => ({
    state
  }))(WithEntityHolder)
}