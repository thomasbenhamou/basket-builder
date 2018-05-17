import React from 'react';
import classes from './Welcome.css';

const welcome = (props) => (
  <React.Fragment>
    <h2>Bienvenue dans l'interface de management</h2>
    <h3>Vous pouvez :</h3>
    <div className={classes.cardWrapper}>
      <div 
      className={classes.card}
      onClick={props.priceClick}>Consulter et modifier les prix des produits</div>
      <div 
        className={classes.card}
        onClick={props.monthBasketClick}>Consulter modifier la composition du panier du mois</div>
    </div>
  </React.Fragment>
)

export default welcome;