import React from 'react';
import classes from './NavMenu.css';

const navMenu = (props) => (
  <React.Fragment>
    <div 
      className={classes.DrawerToggle}
      onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <span className={classes.Brand}>Le Panier Bio</span>
  </React.Fragment>
)

export default navMenu;