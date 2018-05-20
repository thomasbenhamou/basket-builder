import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';


const navigationItem = (props) => {
  let customClass = classes.NavigationItem;
  if (props.class === 'connectButton') {
    customClass = classes.connectButton;
  }
  if (props.class === 'disconnectButton') {
    customClass = classes.disconnectButton;
  }
  return (
  <li className={customClass}>
    <NavLink 
      to={props.link}
      exact={props.exact}
      activeClassName={classes.active}>
        {props.children}
        {props.badged ? <span className={classes.badge}>1</span> : null}
    </NavLink>
  </li>
  )
};

export default navigationItem;