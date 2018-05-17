import React, {Component} from 'react';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';

import { Redirect } from 'react-router-dom';

class Logout extends Component {
  // component gets rendered when route = /logout 
  // ie when user clicks on the logout button
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return < Redirect to = "/" />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);