import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  updatedElements: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MANAGER_DATA:
      return {
        ...state,
        ingredients: action.ingredients
      }
    case actionTypes.UPDATE_PRICE:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.element]:{
            ...state.ingredients[action.element],
            price: action.newPrice
          }
        }
      }
    default:
      return state;
  }
}

export default reducer;