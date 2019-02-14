import React from 'react'
import { connect } from 'react-redux';

export const withEntityHolder = /* (getHolderState) => */ (Comp) => {
  class WithEntityHolder extends React.Component {
    componentDidMount () {
      // prepare id
      this.props.dispatch({ type: '@entityHolder/RETRIEVE_ENTITY', payload: this.props.id })
    }

    componentWillUnmount () {
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