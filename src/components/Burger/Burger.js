import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';
import emptyBasket from '../../assets/img/empty-basket.png';

const burger = (props) => {  

  let transformedIngredients = Object
    .keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey].quantity)].map((_, i) => {
          return <BurgerIngredient key={igKey + i} type={igKey} clicked={props.ingredientClicked} price={props.ingredients[igKey].price}/>
        }) 
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p className={classes.Teaser}>Commencez à remplir votre panier!</p>
  }
  
return (
    <div className={classes.Burger}>
      <div>
        {transformedIngredients}
      </div>
      <div className={classes.Basket}>
        <img className={classes.BasketImg} src={emptyBasket} alt="Mon p'tit panier" />
      </div>
    </div>
  );
};

export default burger;