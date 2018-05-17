import {delay} from 'redux-saga';
import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* logoutSaga (action) {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga (action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga (action) {
  yield put(actions.authStart());

  const authData = {
      email: action.email,
      password: action.password,
      returnSecureToken: true
  }
  let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCjuq4sR_AKv4w7CAxx06oUGGxQ8sLnViQ';
  
  if (!action.isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCjuq4sR_AKv4w7CAxx06oUGGxQ8sLnViQ';
  }

  try { 
  const response = yield axios.post(url, authData);
  
  const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
  localStorage.setItem('token', response.data.idToken);
  localStorage.setItem('expirationDate', expirationDate);
  localStorage.setItem('userId', response.data.localId);
  yield put(actions.authSuccess(response.data.idToken, response.data.localId));
  yield put (actions.checkAuthTimeout(response.data.expiresIn));
  yield put (actions.addToast({text: "Vous êtes bien connecté!"}));
  } catch(error) {
      yield put(actions.authFail(error.response.data.error));
  }

}

export function* authCheckStateSaga (action) {
    const token = localStorage.getItem('token');
    if (!token) {
       yield put(actions.logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const userId = localStorage.getItem('userId');
      if (expirationDate <= new Date()) {
        yield put (actions.logout());
      } else {
        yield put (actions.authSuccess(token, userId));
        yield put (actions.checkAuthTimeout(((expirationDate.getTime() - new Date().getTime()) / 1000)));
      }
    }
}