import React from 'react';
import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavMenu from './NavMenu/NavMenu';
import Logo from '../../Logo/Logo';
import {Link} from 'react-router-dom';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <NavMenu clicked={props.navMenuClicked}/>
    <div className={classes.logoContainer}>
      <div className={classes.Logo}>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <span className={classes.Brand}><Link to="/">Le Panier Bio</Link></span>
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
  </header>
);

export default toolbar;