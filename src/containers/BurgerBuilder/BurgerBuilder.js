import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';

import * as actions from '../../store/actions/index';

import classes from './BurgerBuilder.css';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../components/UI/Button/Button';
import Toasts from '../../components/UI/Toasts/Toasts';

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    tooManyIngs: false
  }

  componentDidMount () {
    
    if (!this.props.showedTip) {
      const tipText = "Cliquez sur un produit pour l'ajouter au panier. Cliquer à nouveau sur un produit pour l'enlever du panier."
      this.props.onShowTip(tipText);
      this.props.onSwitchShowedTipState();
    }
    
    if (this.props.history.location.pathname === '/builder/panierdumois') {
      this.props.onInitMonthIngredients();
      return
    }

    if (this.state.purchasing || this.props.hasOrdered ) {
      return
    } else if (this.props.building && this.props.hasOrdered){
      return
    } else if (this.props.building) {
      return
    } else {
        this.props.onInitIngredients();
    }

  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        purchasing: true,
        tooManyIngs: false
      })
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.setState({
      purchasing: true
    })
    this.props.history.push({ pathname: '/checkout/contact-data'});
  }

  addIngredientHandler = (ingName, ingPrice) => {
    if (this.props.totalIngredients < 10) {
      this.props.onIngredientAdded(ingName, ingPrice);
    } else {
      this.setState({
        tooManyIngs: true
      })
    }
  }

  backToBasketHandler = () => {
    this.setState({
      tooManyIngs: false
    })
  }

  render () {
    
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;

    let burger = this.props.error ? <p>Nous n'avons pas pu charger les produits disponibles. Toutes nos excuses! Nous allons régler ça au plus vite.</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <React.Fragment>
          <Burger 
            ingredients={this.props.ings}
            ingredientClicked={this.props.onIngredientRemoved}/>
          <BuildControls
            ingredientAdded={(ingName, ingPrice) => this.addIngredientHandler(ingName, ingPrice)}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={Math.abs(this.props.totalPrice)}
            purchasable={this.props.totalIngredients > 0}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </React.Fragment>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        totalPrice={this.props.totalPrice}
        displayButtons={true}
        displayHr={true}
      />;
    }

    const tooManyIngsMessage = (
      <div className={classes.TooManyMessage}>
        <h3>Panier rempli !</h3>
        <p>Vous avez déjà ajouté 10 produits à votre panier.</p>
        <p><strong>Votre petit panier est plein (maximum 10 produits).</strong> Il ne vous reste plus qu'à passer commande ! </p>
        <Button 
          btnType="Danger"
          clicked={this.backToBasketHandler}
          >Retour au panier
        </Button>
        <Button
          btnType="Success"
          clicked={this.purchaseHandler}>
          Commander
        </Button>
      </div>
    );

    return (
      <React.Fragment>
        <Toasts />
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
          >
          {orderSummary}
        </Modal>
        <Modal
          show={this.state.tooManyIngs}
          modalClosed={this.backToBasketHandler}>
          {tooManyIngsMessage}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.builder.ingredients,
    totalPrice: state.builder.totalPrice,
    totalIngredients: state.builder.totalIngredients,
    error: state.builder.error,
    isAuthenticated: state.auth.token !== null,
    hasOrdered: state.order.purchased,
    building: state.builder.building,
    showedTip: state.builder.showedTip
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName, ingPrice) => dispatch(actions.addIngredient(ingName, ingPrice)),
    onIngredientRemoved: (ingName, ingPrice) => dispatch(actions.removeIngredient(ingName, ingPrice)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitMonthIngredients: () => dispatch(actions.initMonthIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    onShowTip: (tipText) => dispatch(actions.addToast({text: tipText})),
    onSwitchShowedTipState: () => dispatch(actions.switchShowedTipState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));