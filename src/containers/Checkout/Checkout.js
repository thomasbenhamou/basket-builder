import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { Elements } from 'react-stripe-elements';
import {Route} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Toasts from '../../components/UI/Toasts/Toasts';
import PaymentForm from './PaymentForm/PaymentForm';

class Checkout extends Component {

  state = {
    order: null
  }

  checkoutCancelledHandler = () => {
    this.props.history.replace('/builder');
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/payment');
  }

  paymentHandler = (orderData, token) => {
    this.setState({
      order: orderData
    });
    this.props.history.replace('/checkout/payment');
  }

  finalizePaymentHandler = () => {
    this.props.onOrderBasket(this.state.order, this.props.token);
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
          <ContactData onPayment={this.paymentHandler}/>
          <Elements>
            <Route 
              path={this.props.match.path + '/payment'}
              render={() => 
                <PaymentForm 
                  totalPrice={this.props.totalPrice}
                  onFinalizePayment={this.finalizePaymentHandler}/>}/>
          </Elements>
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
    onOrderBasket: (orderData, token) => dispatch(actions.purchaseBasket(orderData, token))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);