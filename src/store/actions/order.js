import * as actionTypes from './actionTypes';

export const purchaseBasketSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BASKET_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBasketFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BASKET_FAIL,
    error: error
  }
}

export const purchaseBasketStart = () => {
  return {
    type: actionTypes.PURCHASE_BASKET_START
  }
}

export const purchaseBasket = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BASKET,
    orderData: orderData,
    token: token
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const removeBadge = () => {
  return {
    type: actionTypes.REMOVE_BADGE
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS,
    token: token,
    userId: userId
  }
}