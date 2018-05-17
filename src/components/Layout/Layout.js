import React, {Component} from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  sideDrawerHandler = () => {
    const oldSideDrawerState = this.state.showSideDrawer;
    const newSideDrawerState = !oldSideDrawerState;
    this.setState({
      showSideDrawer: newSideDrawerState
    })
  }
  
  render () {

    return (
      
      <React.Fragment>
        <Toolbar 
        isAuth={this.props.isAuthenticated}
        navMenuClicked={this.sideDrawerHandler}
        />
        <SideDrawer 
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerClosedHandler}/>
          <main 
            className={classes.Content}>
            {this.props.children}
          </main>
      </React.Fragment >
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
} 

export default connect(mapStateToProps)(Layout);