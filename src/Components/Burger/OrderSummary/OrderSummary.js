import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <>
      <h3>Your Order</h3>
      <p>This is your order summary</p>
      {ingredientsSummary}
      <p>
        <strong>Total price : {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout ?</p>
      <Button btnType='Danger' onClick={props.onCancelClick}>
        CANCEL
      </Button>
      <Button btnType='Success' onClick={props.onContinueClick}>
        CONTINUE
      </Button>
    </>
  );
};

export default OrderSummary;
