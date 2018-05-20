import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Toasts from '../../components/UI/Toasts/Toasts';

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.replace('/builder');
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/payment');
  }
  
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
      <div style={{textAlign: 'center'}}>
        <Toasts />
          {purchaseRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            totalPrice={this.props.totalPrice}
            checkoutCancelled={this.checkoutCancelledHandler}
          />
          <ContactData />
      </div>);
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.builder.ingredients,
    totalPrice: state.builder.totalPrice,
    purchased: state.order.purchased,
    token: state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBasket: (orderData, userToken) => dispatch(actions.purchaseBasket(orderData, userToken))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);