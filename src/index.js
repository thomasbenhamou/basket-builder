import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {watchAuth, watchBuilder, watchManager} from './store/sagas/index';

import builderReducer from './store/reducers/builder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';  
import toastReducer from './store/reducers/toasts';
import managerReducer from './store/reducers/manager';

import registerServiceWorker from './registerServiceWorker';


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  builder: builderReducer,
  order: orderReducer,
  auth: authReducer,
  toasts: toastReducer,
  manager: managerReducer
})

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBuilder);
sagaMiddleware.run(watchManager);

const app = (
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
