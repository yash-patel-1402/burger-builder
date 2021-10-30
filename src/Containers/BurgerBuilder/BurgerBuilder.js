import React, { Component } from 'react';

import axios from '../../axios-order';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Burger from '../../Components/Burger/Burger';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
      ingredients: null,
      price: 0,
      purchasable: false,
      showOrderSummary: false,
      loading: false,
      error: false,
    };
  }

  componentDidMount = () => {
    // console.log('BurgerBuilder componentDidMount called');
    axios
      .get(
        'https://react-burger-b5a2b-default-rtdb.firebaseio.com/ingredients.json'
      )
      .then((response) => {
        console.log(response);
        this.setState({
          ingredients: response.data,
          price: this.getPrice(response.data),
          purchasable: this.getPurchasable(response.data),
        });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };

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

  getPrice = (ingredients) => {
    let price = 0;
    // console.log(ingredients);
    for (let key in ingredients) {
      price += INGREDIENT_PRICES[key] * ingredients[key];
    }
    // console.log(price);
    return price;
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
    const searchParamArr = Object.keys(this.state.ingredients).map(
      (igKey) =>
        `${encodeURIComponent(igKey)}=${encodeURIComponent(
          this.state.ingredients[igKey]
        )}`
    );
    searchParamArr.push(`&price=${this.state.price}`);

    this.props.history.push({
      pathname: '/checkout',
      search: `?${searchParamArr.join('&')}`,
    });
  };

  render() {
    let orderSummary = null;
    let burgerPanel = <Spinner />;

    if (this.state.error) {
      burgerPanel = (
        <p
          style={{
            color: 'red',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textAlign: 'center',
          }}
        >
          Something went wrong with our servers! Please try again later...
        </p>
      );
    }

    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.price}
          onCancelClick={this.hideOrderSummary}
          onContinueClick={this.continueToOrder}
        />
      );

      burgerPanel = (
        <>
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
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Modal
          onCloseModalClick={this.hideOrderSummary}
          show={this.state.showOrderSummary}
        >
          {orderSummary}
        </Modal>
        {burgerPanel}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
