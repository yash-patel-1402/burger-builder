import React from 'react';

import classes from './Order.module.css';

const Order = (props) => {
  const ingredients = Object.keys(props.ingredients).map((igKey) => {
    return (
      <span
        key={igKey}
        className={classes.Ingredient_Price_Box}
      >{`${igKey} (${props.ingredients[igKey]})`}</span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients : {ingredients}</p>
      <p>
        Price :{' '}
        <span className={classes.Ingredient_Price_Box}>{`$${props.price.toFixed(
          2
        )}`}</span>
      </p>
    </div>
  );
};

export default Order;
