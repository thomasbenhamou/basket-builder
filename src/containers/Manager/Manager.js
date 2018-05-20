import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import classes from './Manager.css';

import MonthBasket from './MonthBasket/MonthBasket';
import Ingredients from './Ingredients/Ingredients';
import Welcome from './Welcome/Welcome';

class Manager extends Component {
  

  rightPaneClickHandler = () => {
    this.props.history.replace('/manager/panierdumois');
  }
  leftPaneClickHandler = () => {
    this.props.history.replace('/manager/ingredients');
  }
  welcomePaneClickHandler = () => {
    this.props.history.replace('/manager');
  }

  render () {

    return (
      <div className={classes.mainWrapper}>
        <div className={classes.fixedMenu}>
          <div
            className={this.props.location.pathname === '/manager' ? classes.paneCurrent : classes.pane}
            onClick={this.welcomePaneClickHandler}
          >
            <span>&#8962; Menu</span>
          </div>
          <div
            className={this.props.location.pathname === '/manager/ingredients' ? classes.paneCurrent : classes.pane}
            onClick={this.leftPaneClickHandler}
            >
            <span>Gestion des prix</span>
          </div>
          <div
            className={this.props.location.pathname === '/manager/panierdumois' ? classes.paneCurrent : classes.pane}
            onClick={this.rightPaneClickHandler}>
            <span>Panier du mois</span>
          </div>
        </div>
        <div className={classes.contentWrapper}>
          <Route
            path={this.props.match.path + '/ingredients'}
            component={Ingredients} />
          <Route
            path={this.props.match.path + '/panierdumois'}
            component={MonthBasket} />
          <Route
            path={this.props.match.path + ''}
            exact
            render={() => (<Welcome 
              priceClick={this.leftPaneClickHandler} 
              monthBasketClick={this.rightPaneClickHandler}
            />)} />
        </div>
      </div>

    );
  }
}

export default withRouter(Manager);