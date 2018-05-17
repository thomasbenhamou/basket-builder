import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import classes from './Toasts.css';
import Toast from './Toast/Toast';

class Toasts extends Component {
  state = {
    show: false
  }
  
  render () {
    const toasts = this.props.toastList.map(toast => (
          <Toast
            show={this.state.show}
            key={toast.id}
            id={toast.id}
            clicked={this.props.removeToast}
            color={toast.color}
            text={toast.text}
            timedOut={this.props.removeToast}
          />
    ));
    return (
      <ul className={classes.Toasts}>
        {toasts}
      </ul>
    )
  }
}

const mapStateToProps = state => {
  return {
    toastList: state.toasts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeToast: (id) => dispatch(actions.removeToast(id)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toasts);