import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions/index';

export function* initManagerDataSaga(action) {
  try {
    const response = yield axios.get('https://le-panier-bio.firebaseio.com/ings.json');
    yield put(actions.setManagerData(response.data));
  } catch (error) {
    console.log(error);
  }
}