import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth';
import {purchaseBasketSaga, fetchOrdersSaga} from './order';
import { initIngredientsSaga, initMonthIngredientsSaga, initControlsSaga} from './builder';
import {initManagerDataSaga} from './manager';
import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
  yield takeEvery(actionTypes.INIT_MONTH_INGREDIENTS, initMonthIngredientsSaga);
}

export function* watchBuilder() {
  yield takeEvery(actionTypes.PURCHASE_BASKET, purchaseBasketSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
  yield takeEvery(actionTypes.INIT_CONTROLS, initControlsSaga);
}

export function* watchManager() {
  yield takeEvery(actionTypes.FETCH_MANAGER_DATA, initManagerDataSaga);
}