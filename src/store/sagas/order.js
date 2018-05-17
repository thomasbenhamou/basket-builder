import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-orders';

export function* purchaseBasketSaga (action) {
    yield put (actions.purchaseBasketStart());
    try {
      const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
      yield put (actions.purchaseBasketSuccess(response.data.name, action.orderData));
      // re-init ingredients after a successfull order
      yield put(actions.initIngredients());
    } catch (error) {
      yield put(actions.purchaseBasketFail(error));
    }
}

export function* fetchOrdersSaga (action) {
  yield put (actions.fetchOrdersStart());
  const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
  try {
    const response = yield axios.get('/orders.json' + queryParams);
    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({
        ...response.data[key],
        id: key
      });
    }
      yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail());
  }
}
