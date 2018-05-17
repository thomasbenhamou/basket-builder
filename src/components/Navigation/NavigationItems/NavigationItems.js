import React, {Component} from 'react';
import { connect } from 'react-redux';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component {
  
  render() {
    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/manager">Gestion des produits</NavigationItem>
        <NavigationItem link="/builder">Mon p'tit panier</NavigationItem>
        {!this.props.isAuthenticated ? null
        : <NavigationItem link="/orders" badged={this.props.hasBadge} >Mes commandes</NavigationItem>
        }
        {!this.props.isAuthenticated ?
          <NavigationItem link="/auth" class="connectButton">Se connecter</NavigationItem>
          : <NavigationItem link="/logout" class="disconnectButton">Se déconnecter</NavigationItem>}
      </ul>
    )
  }
}

const mapStateToProps = state => {
  return {
    hasOrdered: state.order.purchased,
    hasBadge: state.order.showBadge
  }
}

export default connect(mapStateToProps)(NavigationItems);