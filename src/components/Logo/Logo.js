import React from 'react';
import classes from './Logo.css';
import Logo from '../../assets/img/basket-160442_640.png';

const logo = (props) => (  <div className={classes.Logo}>
    <img 
      src={Logo}
      alt="Mon p'tit panier bio"/>
  </div>
);


export default logo;