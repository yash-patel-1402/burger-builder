import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredients = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: { ingredientName },
  };
};

export const removeIngredients = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: { ingredientName },
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: {
      ingredients,
    },
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const fetchIngredients = () => {
  return (dispatch) => {
    axios
      .get('/ingredients.json')
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
