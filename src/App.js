import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import ('./containers/Checkout/Checkout');
})
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})
const asyncManager = asyncComponent(() => {
  return import('./containers/Manager/Manager');
})



class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  
  render() {

    let routes = (
      
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/builder" component={BurgerBuilder} />
        <Route path="/manager" component={asyncManager} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/builder" component={BurgerBuilder} />
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/manager" component={asyncManager} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
