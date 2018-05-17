import React, {Component} from 'react';
import axios from 'axios';
import classes from './Ingredients.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Ingredients extends Component {
  state = {
    ingredientsData: null,
    loading: false,
    saved: true,
    inputsHaveChanged: false
  }
  componentDidMount = () => {
    axios.get('https://le-panier-bio.firebaseio.com/ings.json')
      .then(response => {
        this.setState({
          ingredientsData: response.data
        })
      }).catch(error => {
        console.log(error);
      })
  }

  handleChange = (event, ingType) => {
    let newPrice = +event.target.value;
    let updatedIng = {
      ...this.state.ingredientsData[ingType],
      price: newPrice
    }
    this.setState({
      ingredientsData: {
        ...this.state.ingredientsData,
        [updatedIng.type]: updatedIng
      },
      inputsHaveChanged: true,
      saved: false
    });
  }

  saveHandler = () => {
    if (this.state.saved) {
      return
    }
    this.setState({
      loading: true
    })
    axios.put('https://le-panier-bio.firebaseio.com/ings.json', this.state.ingredientsData)
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
  render() {
    let ingredients = null;
    if (this.state.ingredientsData) {
      ingredients = Object.keys(this.state.ingredientsData)
        .map((igKey, i) => (
            <div className={classes.card} key={i}>
              <p className={classes.ingName}>{this.state.ingredientsData[igKey].label}</p>
            <img src={require('../../../assets/products-img/' + this.state.ingredientsData[igKey].type + '.png')} alt={this.state.ingredientsData[igKey].label} />
              <input
                type="number"
                onChange={(event) => this.handleChange(event, this.state.ingredientsData[igKey].type)}
                className={classes.priceInput}
                value={this.state.ingredientsData[igKey].price.toFixed(2)}
                step="0.1"
                min="1"
                max="7"
              /> <span className={classes.currency}>€</span>
            </div>
        ));
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
        <div className={classes.buttonDiv}>
          <Button
            clicked={this.saveHandler}
            btnType="Success"
            disabled={this.state.saved}
          >{savedMessage}
          </Button>
        </div>
        <div className={classes.cardWrapper}>
          {this.state.ingredientsData ? ingredients : <Spinner />}
        </div>
      </React.Fragment>
    )
  }
}

export default Ingredients;