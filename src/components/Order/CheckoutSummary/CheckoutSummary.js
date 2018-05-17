import React from 'react';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <Button 
        btnType="Danger"
        clicked={props.checkoutCancelled}
        >Retour au panier</Button>
      <h2>Total de vos achats : {props.totalPrice.toFixed(2)} €</h2>
    </div>
  );
}

export default checkoutSummary;