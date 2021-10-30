import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0,
  },
  price: 0,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.3,
  bacon: 0.7,
  cheese: 0.3,
};

const add_ingredients = (state, ingredientName) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [ingredientName]: state.ingredients[ingredientName] + 1,
    },
    price: Math.abs(state.price + INGREDIENT_PRICES[ingredientName]),
  };
};

const remove_ingredients = (state, ingredientName) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [ingredientName]: state.ingredients[ingredientName] - 1,
    },
    price: Math.abs(state.price - INGREDIENT_PRICES[ingredientName]),
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return add_ingredients(state, action.payload.ingredientName);
    case actionTypes.REMOVE_INGREDIENT:
      return remove_ingredients(state, action.payload.ingredientName);
    default:
      return state;
  }
};

export default reducer;
