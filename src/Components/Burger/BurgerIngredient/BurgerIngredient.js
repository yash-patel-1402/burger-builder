import React from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.module.css';
import * as ingredientTypes from './IngredientTypes';

const BurgerIngredient = (props) => {
  let ingredient = null;
  switch (props.type) {
    case ingredientTypes.BREAD_TOP:
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1} />
          <div className={classes.Seeds2} />
        </div>
      );
      break;
    case ingredientTypes.BREAD_BOTTOM:
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case ingredientTypes.CHEESE:
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case ingredientTypes.MEAT:
      ingredient = <div className={classes.Meat}></div>;
      break;
    case ingredientTypes.SALAD:
      ingredient = <div className={classes.Salad}></div>;
      break;
    case ingredientTypes.BACON:
      ingredient = <div className={classes.Bacon}></div>;
      break;
    default:
      throw Error(`Ingrdient type '${props.type}' not known!`);
  }
  return ingredient;
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
