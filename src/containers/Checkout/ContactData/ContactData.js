import React, {Component} from 'react';
import {connect} from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/validation';

class ContactData extends Component {
  state = {
    orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Votre nom',
            autoComplete: 'name'
          },
          value: '',
          validation: {
            required: true,
            minLength: 2
          },
          valid: false,
          touched: false
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Rue, route, chemin...',
            autoComplete: 'street-address'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Code postal',
            autoComplete: 'postal-code'
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5,
            isNumeric: true
          },
          valid: false,
          touched: false
        },
        city: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Ville',
            autoComplete: 'address-level2'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
      email: {
        elementType: 'email',
        elementConfig: {
          type: 'text',
          placeholder: 'Votre email',
          autoComplete: 'email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      phone: {
        elementType: 'phone',
        elementConfig: {
          type: 'text',
          placeholder: 'Votre téléphone',
          autoComplete: 'tel'
        },
        value: '',
        validation: {
          required: true,
          isNumeric: true,
          minLength: 10,
          maxLength: 10
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Express'},
            {value: 'normal', displayValue: 'Normal'},
          ]
        },
        value: 'fastest',
        validation: {
        },
        touched: true,
        valid: true
      }
    },
    formIsValid: false
  }

  orderHandler = () =>{
    if (!this.state.formIsValid) {
      return;
    }
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.totalPrice.toFixed(2),
      orderData: formData,
      userId: this.props.userId,
      date: new Date()
    }
    this.props.onPayment(order, this.props.token);
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    
    updatedFormElement.touched = true;

    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    })
  }

  onToken = (token) => {
    // triggered when payment has been successfull
    this.orderHandler();
  }



  render() {

    const formElementsArray = [];
    for (let key in this.state.orderForm) {
        formElementsArray.push({
          id: key,
          config: this.state.orderForm[key]
        })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
    </form>);

    if (this.props.loading) {
      form = <Spinner />;
    }

    const payButton = <Button btnType="Success" disabled>Paiement</Button>;

    return (
      <div className={classes.ContactData}>
        <h4>Informations sur la livraison</h4>
          {form}
        {this.state.formIsValid ? 
          <StripeCheckout
            token={this.onToken}
            stripeKey="pk_test_PwoZhva8nT85oEFYpBFhzyzm"
            name="Le p'tit panier bio"
            description="Votre panier"
            panelLabel="Payez"
            amount={this.props.totalPrice * 100}
            currency="EUR"
            locale="fr"
            allowRememberMe={false}>
            <Button btnType="Success">Paiement</Button>
          </StripeCheckout>
          : payButton
        }
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.builder.ingredients,
    totalPrice: state.builder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPayment: (orderData, userToken) => dispatch(actions.purchaseBasket(orderData, userToken))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));