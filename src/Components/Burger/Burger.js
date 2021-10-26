import React from 'react';

import classes from './Burger.module.css';
import * as ingredientTypes from './BurgerIngredient/IngredientTypes';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import PropTypes from 'prop-types';

const Burger = (props) => {
  const generateMulitpleSingleIng = (type) => {
    return [...Array(props.ingredients[type])].map((_, index) => {
      return <BurgerIngredient key={`${type}_${index}`} type={type} />;
    });
  };

  let ingredients = Object.keys(props.ingredients)
    .map(generateMulitpleSingleIng)
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (ingredients.length === 0) {
    ingredients = (
      <p style={{ color: 'red' }}>Please select some ingredients!</p>
    );
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={ingredientTypes.BREAD_TOP} />
      {ingredients}
      <BurgerIngredient type={ingredientTypes.BREAD_BOTTOM} />
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.object.isRequired,
};

export default Burger;
