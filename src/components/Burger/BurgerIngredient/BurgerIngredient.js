import React, {Component } from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component {
  render() {
    return (
      <div
        className={classes.imgWrapper}
        onClick={() => this.props.clicked(this.props.type, this.props.price)}
        >
        <img src={require('../../../assets/products-img/' + this.props.type + '.png')} className={classes} alt={this.props.type}/>
        <span className={classes.closeButton}>x</span>
      </div>
    )
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default BurgerIngredient;