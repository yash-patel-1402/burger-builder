import React, { Component } from 'react';

import axios from '../../axios-order';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Burger from '../../Components/Burger/Burger';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

export class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasable: false,
      showOrderSummary: false,
      loading: false,
      error: false,
    };
  }

  // componentDidMount = () => {
  //   // console.log('BurgerBuilder componentDidMount called');
  //   axios
  //     .get(
  //       'https://react-burger-b5a2b-default-rtdb.firebaseio.com/ingredients.json'
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       this.setState({
  //         ingredients: response.data,
  //         price: this.getPrice(response.data),
  //         purchasable: this.getPurchasable(response.data),
  //       });
  //     })
  //     .catch((error) => {
  //       this.setState({ error: true });
  //     });
  // };

  getPurchasable = (updatedIngredients) => {
    const ingredientsCount = Object.keys(updatedIngredients)
      .map((igKey) => updatedIngredients[igKey])
      .reduce((totalCount, count) => totalCount + count, 0);
    return ingredientsCount > 0;
  };

  // getPrice = (ingredients) => {
  //   let price = 0;
  //   // console.log(ingredients);
  //   for (let key in ingredients) {
  //     price += INGREDIENT_PRICES[key] * ingredients[key];
  //   }
  //   // console.log(price);
  //   return price;
  // };

  getDisabledConfig = () => {
    const disabledConfig = {
      ...this.props.ingredients,
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
    this.props.history.push('/checkout');
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

    if (this.props.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.price}
          onCancelClick={this.hideOrderSummary}
          onContinueClick={this.continueToOrder}
        />
      );

      burgerPanel = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            price={this.props.price}
            ingredients={this.props.ingredients}
            removeIngredient={this.props.onRemoveIngredient}
            addIngredient={this.props.onAddIngredient}
            disabledConfig={this.getDisabledConfig()}
            purchasable={this.getPurchasable(this.props.ingredients)}
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

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    ingredients: state.ingredients,
    price: state.price,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientName) => {
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payload: { ingredientName },
      });
    },
    onRemoveIngredient: (ingredientName) => {
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        payload: { ingredientName },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
