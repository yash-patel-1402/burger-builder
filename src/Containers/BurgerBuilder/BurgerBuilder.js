import React, { Component } from 'react';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';

import Burger from '../../Components/Burger/Burger';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.3,
  bacon: 0.7,
  cheese: 0.3,
};

export class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        meat: 0,
        salad: 0,
        bacon: 0,
        cheese: 0,
      },
      price: 0,
      purchasable: false,
      showOrderSummary: false,
    };
  }

  getPurchasable = (updatedIngredients) => {
    const ingredientsCount = Object.keys(updatedIngredients)
      .map((igKey) => updatedIngredients[igKey])
      .reduce((totalCount, count) => totalCount + count, 0);
    return ingredientsCount > 0;
  };

  addIngredient = (type) => {
    this.setState((prevState) => {
      const updatedIngredients = {
        ...prevState.ingredients,
        [type]: prevState.ingredients[type] + 1,
      };
      const updatedPrice = prevState.price + INGREDIENT_PRICES[type];
      return {
        price: updatedPrice,
        ingredients: updatedIngredients,
        purchasable: this.getPurchasable(updatedIngredients),
      };
    });
    // console.log(this.state);
  };

  removeIngredient = (type) => {
    if (this.state.ingredients[type] <= 0) return;
    this.setState((prevState) => {
      const updatedIngredients = {
        ...prevState.ingredients,
        [type]: prevState.ingredients[type] - 1,
      };
      const updatedPrice = prevState.price - INGREDIENT_PRICES[type];
      return {
        price: updatedPrice,
        ingredients: updatedIngredients,
        purchasable: this.getPurchasable(updatedIngredients),
      };
    });
    // console.log(this.state);
  };

  getDisabledConfig = () => {
    const disabledConfig = {
      ...this.state.ingredients,
    };

    for (const key in disabledConfig)
      disabledConfig[key] = disabledConfig[key] <= 0;

    return disabledConfig;
  };

  showOrderSummary = () => {
    this.setState({
      showOrderSummary: true,
    });
  };

  hideOrderSummary = () => {
    this.setState({ showOrderSummary: false });
  };

  continueToOrder = () => {
    alert('You keep going!');
  };

  render() {
    return (
      <>
        <Modal
          onCloseModalClick={this.hideOrderSummary}
          show={this.state.showOrderSummary}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.price}
            onCancelClick={this.hideOrderSummary}
            onContinueClick={this.continueToOrder}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.price}
          ingredients={this.state.ingredients}
          removeIngredient={this.removeIngredient}
          addIngredient={this.addIngredient}
          disabledConfig={this.getDisabledConfig()}
          purchasable={this.state.purchasable}
          onOrderButtonClick={this.showOrderSummary}
        />
      </>
    );
  }
}

export default BurgerBuilder;
