import React from 'react';
import classes from './Order.css';

const order = (props) => {

  const ingsOutput = Object.keys(props.ingredients)
    .map(igKey => {
      if (props.ingredients[igKey].quantity > 0) {
        return (<span
          key={props.ingredients[igKey].label + props.ingredients[igKey].quantity}
          style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '3px 8px',
            borderRight: '1px dashed #ccc',
            padding: '10px'
          }}
        >{props.ingredients[igKey].label} : {props.ingredients[igKey].quantity} kg</span>)
      }
      else return null;
    });
  const orderDate = new Date(props.date);
  return (
  <div className={classes.Order}>
      <p className={classes.grayText}>Date de la commande : {orderDate.toLocaleDateString()}</p>
      <p className={classes.grayText}>Produits commandés :</p>
      {ingsOutput}
    <p className={classes.orderTotal}>Total panier : <strong>{props.price.toFixed(2)}€</strong></p>
  </div>)
};

export default order;