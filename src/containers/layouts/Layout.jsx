import React from 'react'
import { connect } from 'react-redux'

import LoadingSpinner from 'components/LoadingSpinner'
import { getItems } from 'redux/actions/Item'

class Layout extends React.Component {
  componentDidMount() {
    this.props.dispatch(getItems())
  }
  render() {
    const { loading } = this.props
    return (
      <React.Fragment>
        <div className="fixed-body"></div>
        {loading && (
          <div className="loading">
            <LoadingSpinner />
          </div>
        )}
        <div className="Layout">{this.props.children}</div>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loadState
  }
}
export default connect(mapStateToProps)(Layout)
