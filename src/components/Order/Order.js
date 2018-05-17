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
            border: '1px solid #ccc',
            padding: '5px'
          }}
        >{props.ingredients[igKey].label} ({props.ingredients[igKey].quantity}kg)</span>)
      }
      else return null;
    });

  return (
  <div className={classes.Order}>
    <p>Produits commandés :</p>
      {ingsOutput}
    <p>Total panier : <strong>{props.price.toFixed(2)}€</strong></p>
  </div>)
};

export default order;