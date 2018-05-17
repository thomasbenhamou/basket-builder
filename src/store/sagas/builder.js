import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions/index';

export function* initIngredientsSaga (action) {
  try {
    const response = yield axios.get('https://le-panier-bio.firebaseio.com/ings.json');
    yield put (actions.setIngredients(response.data));
  } catch (error) {
    yield put (actions.fetchIngredientsFailed());
  }
}

export function* initMonthIngredientsSaga(action) {
  try {
    const response = yield axios.get('https://le-panier-bio.firebaseio.com/panierdumois.json');
    yield put(actions.setIngredients(response.data));
    yield put(actions.calcTotalPrice());
    yield put(actions.startBuilding());
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
}

export function* initControlsSaga (action) {
  try {
    const response = yield axios.get('https://le-panier-bio.firebaseio.com/ings.json'
    );
    yield put(actions.setControls(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
}