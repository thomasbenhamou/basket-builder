import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{

  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
    this.props.onRemoveBadge();
  }


  render(){

    const compare = (a,b) => {
      if (a.date < b.date) {
        return 1
      }
      if (a.date > b.date) {
        return -1
      }
      return 0
    }

    let orders = <Spinner />;
    if (!this.props.loading) {
      const sortedOrders = this.props.orders.sort(compare);
      orders = 
        sortedOrders.map(order => {
          return <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
            date={order.date}
          />
        })
      }
    return(
      <React.Fragment>
        <h2 style={{marginLeft: '30px'}}>Voici la liste de vos précédentes commandes </h2>
        <div>
          {orders}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    onRemoveBadge: () => dispatch(actions.removeBadge())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));