import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  showBadge: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionTypes.PURCHASE_BASKET_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.PURCHASE_BASKET_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      }
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
        showBadge: true
      }
    case actionTypes.REMOVE_BADGE:
      return {
        ...state,
        showBadge: false
      }
    case actionTypes.PURCHASE_BASKET_FAIL:
      return {
        ...state,
        loading: false
      }
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      }
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default reducer;