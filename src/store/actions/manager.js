import * as actionTypes from './actionTypes';

export const fetchManagerData = () => {
  return {
    type: actionTypes.FETCH_MANAGER_DATA
  }
}

export const setManagerData = (ingredients) => {
  return {
    type: actionTypes.SET_MANAGER_DATA,
    ingredients: ingredients
  }
}

export const updatePrice = (newPrice, element) => {
  return {
    type: actionTypes.UPDATE_PRICE,
    newPrice: newPrice,
    element: element
  }
}
