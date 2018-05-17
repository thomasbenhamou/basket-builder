import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Toasts from '../../components/UI/Toasts/Toasts';

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.replace('/builder');
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
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
          <OrderSummary 
            ingredients={this.props.ings}
            totalPrice={this.props.totalPrice}
            displayButtons={false}
            displayHr={false}
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
    purchased: state.order.purchased
  }
}


export default connect(mapStateToProps)(Checkout);