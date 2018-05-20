import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Home.css';
import Card from './Card/Card';
import veggiesImg from '../../assets/backgrounds/heirloomtomatoes.png';
import marketImg from '../../assets/backgrounds/veggiesbasket.png';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import Toasts from '../UI/Toasts/Toasts';


class Home extends Component {

  cardClickhandler = () => {
    this.props.history.push('/builder');
  }

  panierDuMoisClickhandler = () => {
    this.props.history.push('/builder/panierdumois');
  }

  viewOrdersHandler = () => {
    this.props.resetOrderedState();
    this.props.history.push('/orders');
  }

  render() {
    const leftCard = {
      backgroundImage: ' url(' + veggiesImg + ')',
      backgroundSize: 'cover',
      filter: 'contrast(1.4)'
    }
    const rightCard = {
      backgroundImage: ' url(' + marketImg + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'right',
      filter: 'contrast(1.4)'
    }

    const thankYouMessage = (
      <div>
        <h3 style={{color: 'green'}}>Merci pour votre commande !</h3>
        <p>Votre paiement a bien été réalisé.</p>
        <p>Votre p'tit panier bio va être rempli et livré rapidement.</p>
        <Button 
          btnType="Success"
          clicked={this.props.resetOrderedState}>Ok</Button>
        <Button 
          btnType="Danger"
          clicked={this.viewOrdersHandler}>Voir mes commandes</Button>
      </div>
    );
    return (
      <React.Fragment>
      <Toasts />
      <Modal
        show={this.props.hasOrdered}
        modalClosed={this.props.resetOrderedState}>
        {thankYouMessage}
      </Modal>
      <div className={classes.CardContainer}>
          <Card 
            style={leftCard}
            clicked={this.cardClickhandler}
            title="Je remplis mon panier"
            />
          <Card 
            style={rightCard}
            clicked={this.panierDuMoisClickhandler}
            title="Je choisis le panier de saison"
            />
        </div>
        <div className={classes.DescContainer}>
          <p><span role="img" aria-label="image">&#127814;</span> un panier de fruits et légumes bio</p>
          <p>livré chez vous toutes les semaines <span role="img" aria-label="image">
            &#127823;</span></p>
          <p><span role="img" aria-label="image">&#127813;</span> rempli de produits locaux et de saison</p>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    hasOrdered: state.order.purchased
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetOrderedState: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);