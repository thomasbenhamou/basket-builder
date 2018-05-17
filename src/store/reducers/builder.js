import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalIngredients: 0,
  totalPrice: 0,
  error: false,
  building: false,
  controls: null,
  showedTip: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: {
            ...state.ingredients[action.ingredientName],
            quantity: state.ingredients[action.ingredientName].quantity + 1
            }
        },
        totalIngredients: state.totalIngredients +1,
        totalPrice: state.totalPrice + action.ingredientPrice,
        building: true
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: {
            ...state.ingredients[action.ingredientName],
            quantity: state.ingredients[action.ingredientName].quantity - 1
          }
        },
        totalIngredients: state.totalIngredients - 1,
        totalPrice: state.totalPrice - action.ingredientPrice,
        building: true       
    }
    case actionTypes.SET_INGREDIENT:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 0,
        totalIngredients: 0,
        error: false,
        building: false
      }
    case actionTypes.CALC_TOTAL_PRICE:
      let totalPrice = 0;
      let totalIngs = 0;
      Object.keys(state.ingredients)
      .map(igKey => {
        totalPrice += (state.ingredients[igKey].quantity * state.ingredients[igKey].price);
        totalIngs += state.ingredients[igKey].quantity;
        return null;
      });
      return {
        ...state,
        totalPrice: totalPrice,
        totalIngredients: totalIngs
      }
    case actionTypes.START_BUILDING:
    return {
      ...state,
      building: true
    }
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    case actionTypes.SET_CONTROLS:
      return {
        ...state,
        controls: action.controls
      }
    case actionTypes.SWITCH_SHOWED_TIP_STATE:
      return {
        ...state,
        showedTip: !state.showedTip
      }
    default:
      return state;
  } 
}

export default reducer;