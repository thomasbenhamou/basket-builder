import React, {Component} from 'react';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        if (this.props.ingredients[igKey].quantity > 0) {
          return (<li key={igKey}>
            {this.props.ingredients[igKey].quantity}kg  {this.props.ingredients[igKey].label}
            <span className={classes.price}>  ({this.props.ingredients[igKey].price} €/kg)</span>
          </li>)
        } else return null
      });

    let buttons = null;
    if (this.props.displayButtons) {
      buttons = (
        <React.Fragment>
        <p>Je commande?</p>
        <Button
          btnType="Danger"
          clicked={this.props.purchaseCancelled} >Retour</Button>
        <Button
          btnType="Success"
          clicked={this.props.purchaseContinued}
        >C'est parti!</Button>
        </React.Fragment>);
    }

    return (
      <React.Fragment>
        <h3>Votre panier contient :</h3>
        <ul className={classes.ingsList}>
          {ingredientSummary}
        </ul>
        {this.props.displayHr ? <hr /> : null }
        <p className={classes.totalPrice}>Prix total: {this.props.totalPrice.toFixed(2)} €
        </p>
        {buttons}
      </React.Fragment>
    )
  }


};

export default OrderSummary;