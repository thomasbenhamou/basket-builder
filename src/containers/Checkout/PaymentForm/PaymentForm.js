import React from 'react';
import { injectStripe, CardNumberElement, CardCVCElement, CardExpiryElement, PostalCodeElement } from 'react-stripe-elements';
import Modal from '../../../components/UI/Modal/Modal';
import classes from './PaymentForm.css';
import ButtonSpinner from '../../../components/UI/ButtonSpinner/ButtonSpinner';

class PaymentForm extends React.Component {
  
  state = {
    showModal: true,
    fontSize: '14px',
    errorMessage: null,
    loading: false
  }

  handleSubmit = (ev) => {
    this.setState({
      loading: true
    })
    ev.preventDefault();
    this.props.stripe.createToken()
      .then(response => {
        console.log(response);
        if (response.token) {
          console.log(response.token);
          this.setState({
            loading: false
          })
          this.props.onFinalizePayment();
        }
        else {
          this.setState({
            loading: false,
            errorMessage: response.error.message
          })
        }
      })
  }

  cancelPayementHandler = () => {
    this.setState({
      showModal: false
    })
  }

  render() {
    const createOptions = (fontSize) => {
      return {
        style: {
          base: {
            fontSize,
            color: '#424770',
            letterSpacing: '0.025em',
            fontFamily: 'Source Code Pro, Menlo, monospace',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
      };
    };

    return (
      <Modal 
        show={this.state.showModal}
        modalClosed={this.cancelPayementHandler}
        className={classes.payModal}>
        <p className={classes.payTitle}>Mon p'tit panier bio</p>
        <p>Total du panier : {this.props.totalPrice.toFixed(2) + '€'}</p>
        <form onSubmit={this.handleSubmit} className={classes.payForm}>
          <label className={classes.payLabel}>
            Numéro de carte
          <CardNumberElement
            className={classes.StripeElement}
            {...createOptions(this.props.fontSize)}
            />
          </label>
          <label className={classes.payLabel}>
            Date d'expiration
          <CardExpiryElement
            className={classes.StripeElement}
            {...createOptions(this.props.fontSize)}
            />
          </label>
          <label className={classes.payLabel}>
            Code de sécurité (CVC)
          <CardCVCElement
            className={classes.StripeElement}
            {...createOptions(this.props.fontSize)}
            />
          </label>
          <label className={classes.payLabel}>
            Code postal
          <PostalCodeElement
            className={classes.StripeElement}
            {...createOptions(this.props.fontSize)}
            />
          </label>
          <div className={classes.errors}>
            {this.state.errorMessage}
          </div>
          <button className={classes.payButton}>
            {this.state.loading ? <ButtonSpinner /> : 'Paiement'}</button>
        </form>
      </Modal>
    );
  }
}

export default injectStripe(PaymentForm);