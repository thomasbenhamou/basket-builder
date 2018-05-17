import React, {Component} from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';

class BuildControls extends Component {

  componentDidMount () {
    this.props.onInitControls();
  }

  render() {
    let controls = <Spinner />;

     if (this.props.controls) {
      controls = Object.keys(this.props.controls)
        .map(igKey => {
          return (
            <BuildControl
              image={this.props.controls[igKey].type}
              label={this.props.controls[igKey].label}
              key={this.props.controls[igKey].label}
              type={this.props.controls[igKey].type}
              added={(ingName, ingPrice) => this.props.ingredientAdded(ingName, ingPrice)}
              removed={() => this.props.ingredientRemoved(this.props.controls[igKey].type)}
              disabled={this.props.disabled[this.props.controls[igKey].type]}
              price={this.props.controls[igKey].price}
            />
          )
        })
     }
    
    return (
      <React.Fragment>
        <p className={classes.price}>Prix du panier : <strong>{this.props.price.toFixed(2)} €</strong></p>
        <div className={classes.BuildControls}>
          <div className={classes.arrowLeft}>&#60;</div>
            {controls}
          <div className={classes.arrowRight}>&#62;</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            className={classes.OrderButton}
            disabled={!this.props.purchasable}
            onClick={this.props.ordered}
          >{this.props.isAuth ? 'Je commande !' : "S'enregister pour commander"}</button>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    controls: state.builder.controls
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitControls: () => dispatch(actions.initControls())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildControls);

