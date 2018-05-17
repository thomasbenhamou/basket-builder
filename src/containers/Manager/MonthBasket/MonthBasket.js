import React, {Component} from 'react';
import axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './MonthBasket.css';
import Button from '../../../components/UI/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';

class MonthBasket extends Component {
  
  state = {
    monthBasketData: null,
    loading: false,
    saved: true,
    inputsHaveChanged: false,
    totalQuantity: 0,
    maxIngs: false,
    showModal: false
  }

  componentDidMount = () => {
    axios.get('https://le-panier-bio.firebaseio.com/panierdumois.json')
      .then(response => {
        this.setState({
          monthBasketData: response.data
        }, this.updateCounter)
      }).catch(error => {
        console.log(error);
      })
    
  }

  updateCounter = () => {
    let totalCounter = 0;
    Object.keys(this.state.monthBasketData)
      .map(igKey => (
        totalCounter = totalCounter + this.state.monthBasketData[igKey].quantity
      ))
    this.setState({
      totalQuantity: totalCounter
    })
    if (totalCounter > 10) {
      this.setState({
        showModal: true,
        maxIngs: true
      })
    } else {
      this.setState({
        maxIngs: false
      })
    }
  }


  handleChange = (event, ingType) => {
    let newQuantity = +event.target.value;
    let updatedIng = {
      ...this.state.monthBasketData[ingType],
      quantity: newQuantity
    }
    this.setState({
      monthBasketData: {
        ...this.state.monthBasketData,
        [updatedIng.type]: updatedIng
      },
      inputsHaveChanged: true,
      saved: false
    }, this.updateCounter);

  }

  saveHandler = () => {
    if (this.state.saved) {
      return
    }
    this.setState({
      loading: true
    })
    axios.put('https://le-panier-bio.firebaseio.com/panierdumois.json', this.state.monthBasketData)
      .then(response => {
        this.setState({
          saved: true,
          loading: false
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  closeModalHandler = () => 
    this.setState({
      showModal: false
    })

  render () {
    let data = null;
    if (this.state.monthBasketData) {
      data = Object.keys(this.state.monthBasketData)
        .map(((igKey, i) => (
          <div className={classes.card} key={i}>
            <p className={classes.ingName}>{this.state.monthBasketData[igKey].label}</p>
            <img src={require('../../../assets/products-img/' + this.state.monthBasketData[igKey].type + '.png')} alt={this.state.monthBasketData[igKey].label} />
            <input
              type="number"
              onChange={(event) => this.handleChange(event, this.state.monthBasketData[igKey].type)}
              className={classes.quantityInput}
              value={this.state.monthBasketData[igKey].quantity
              }
              step="1"
              min="0"
              max="3"
            />
            </div>
        )))
    }
  
    let savedMessage = "Enregister les modifications";
    if (this.state.loading) {
      savedMessage = (<span>...</span>);
    }
    if (this.state.saved) {
      savedMessage = (
        <React.Fragment>
          <span>Données sauvegardées </span>
          <span>&#10004;</span>
        </React.Fragment>
      );
    }


    return (
      <React.Fragment>
        <Modal
          show={this.state.showModal}
          modalClosed={this.closeModalHandler}>
          <h3>Attention</h3>
          <p>Les paniers ne peuvent pas contenir plus de 10 produits.</p>
          <p>Vous ne pourrez pas sauvegarder votre panier si le nombre total de produits est supérieur à 10.</p>
          <Button 
            btnType="Success"
            clicked={this.closeModalHandler}>Ok</Button>
        </Modal>
        <div className={classes.buttonDiv}>
          <span className={classes.totalChecker}>Nombre total de produits : {this.state.totalQuantity ? this.state.totalQuantity : '...'}</span>
          <Button
            clicked={this.saveHandler}
            btnType="Success"
            disabled={this.state.saved || this.state.totalQuantity > 10}
          >{savedMessage}
          </Button>
        </div>
        <div className={classes.cardWrapper}>
          {this.state.monthBasketData ? data : <Spinner />}
        </div>
      </React.Fragment>
    )
  } 
 
}

export default MonthBasket;