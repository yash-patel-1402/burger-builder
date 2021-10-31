import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  price: 0,
  error: null,
  building: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return add_ingredients(state, action.payload.ingredientName);
    case actionTypes.REMOVE_INGREDIENT:
      return remove_ingredients(state, action.payload.ingredientName);
    case actionTypes.SET_INGREDIENTS:
      return set_ingredients(state, action.payload.ingredients);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetch_ingredients_failed(state);
    default:
      return state;
  }
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
    building: true,
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
    building: true,
    price: Math.abs(state.price - INGREDIENT_PRICES[ingredientName]),
  };
};

const set_ingredients = (state, ingredients) => {
  return {
    ...state,
    ingredients,
    price: get_price(ingredients),
    error: false,
    building: false,
  };
};

const fetch_ingredients_failed = (state) => {
  return {
    ...state,
    error: true,
  };
};

const get_price = (ingredients) => {
  let price = 0;
  for (let key in ingredients) {
    price += ingredients[key] * INGREDIENT_PRICES[key];
  }
  return price;
};

export default reducer;
