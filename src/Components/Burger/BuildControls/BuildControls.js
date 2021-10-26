import React from 'react';

import Control from './Controls/Control';
import classes from './BuildControls.module.css';
import PropTypes from 'prop-types';

const BuildControls = (props) => {
  const controls = Object.keys(props.ingredients).map((igKey, index) => {
    return (
      <Control
        key={`${igKey}_${index}`}
        count={props.ingredients[igKey]}
        label={igKey}
        remove={() => props.removeIngredient(igKey)}
        add={() => props.addIngredient(igKey)}
        disabled={props.disabledConfig[igKey]}
      />
    );
  });
  return (
    <div className={classes.BuildControls}>
      <p className={classes.Price}>
        Price : <strong>{`$ ${props.price.toFixed(2)}`}</strong>
      </p>
      {controls}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.onOrderButtonClick}
      >
        ORDER NOW
      </button>
    </div>
  );
};

BuildControls.propTypes = {
  ingredients: PropTypes.object.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired,
  disabledConfig: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  purchasable: PropTypes.bool.isRequired,
  onOrderButtonClick: PropTypes.func.isRequired,
};

export default BuildControls;
