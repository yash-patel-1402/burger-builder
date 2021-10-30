import React from 'react';

import Burger from '../Burger/Burger';
import classes from './CheckoutSummary.module.css';
import Button from '../UI/Button/Button';

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <Burger ingredients={props.ingredients} />
      <Button btnType='Success' onClick={props.onContinueClick}>
        Continue
      </Button>
      <Button btnType='Danger' onClick={props.onCancelClick}>
        Cancel
      </Button>
    </div>
  );
};

export default CheckoutSummary;
