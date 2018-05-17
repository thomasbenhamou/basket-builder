import * as actionTypes from './actionTypes';
import {createToast} from '../utility';

export const addToast = (options = {}) => {
  return {
    type: actionTypes.ADD_TOAST,
    options: createToast(options)
  }
}

export const removeToast = (id) => {
  return {
    type: actionTypes.REMOVE_TOAST,
    id: id
  }
}