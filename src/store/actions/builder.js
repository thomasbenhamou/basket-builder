import * as actionTypes from './actionTypes';

export const addIngredient = (name, price) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
    ingredientPrice: price
  }
}

export const removeIngredient = (name, price) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
    ingredientPrice: price
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS
  }
}

export const initMonthIngredients = () => {
  return {
    type: actionTypes.INIT_MONTH_INGREDIENTS
  }
}

export const calcTotalPrice = () => {
  return {
    type: actionTypes.CALC_TOTAL_PRICE
  }
}

export const startBuilding = () => {
  return {
    type: actionTypes.START_BUILDING
  }
}

export const initControls = () => {
  return {
    type: actionTypes.INIT_CONTROLS
  }
}

export const setControls = (controls) => {
  return {
    type: actionTypes.SET_CONTROLS,
    controls: controls
  }
}

export const switchShowedTipState = () => {
  return {
    type: actionTypes.SWITCH_SHOWED_TIP_STATE
  }
}
