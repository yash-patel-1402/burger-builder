import React, { Component } from 'react';

import axios from '../../axios-order';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Burger from '../../Components/Burger/Burger';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreators from '../../store/actions/index';

export class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOrderSummary: false,
      error: false,
    };
  }

  componentDidMount = () => {
    this.props.onFetchIngredients();
  };

  getPurchasable = (updatedIngredients) => {
    const ingredientsCount = Object.keys(updatedIngredients)
      .map((igKey) => updatedIngredients[igKey])
      .reduce((totalCount, count) => totalCount + count, 0);
    return ingredientsCount > 0;
  };

  getDisabledConfig = () => {
    const disabledConfig = {
      ...this.props.ingredients,
    };

    for (const key in disabledConfig)
      disabledConfig[key] = disabledConfig[key] <= 0;

    return disabledConfig;
  };

  showOrderSummary = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        showOrderSummary: true,
      });
    } else {
      this.props.onRedirectAfterAuth('/checkout');
      this.props.history.push('/auth');
    }
  };

  hideOrderSummary = () => {
    this.setState({ showOrderSummary: false });
  };

  continueToOrder = () => {
    this.props.onPurchaseInit();
    this.props.history.push('/checkout');
  };

  render() {
    let orderSummary = null;
    let burgerPanel = <Spinner />;

    if (this.props.error) {
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
            isAuthenticated={this.props.isAuthenticated}
          />
        </>
      );
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
    ingredients: state.burger.ingredients,
    price: state.burger.price,
    error: state.burger.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientName) => {
      dispatch(actionCreators.addIngredients(ingredientName));
    },
    onRemoveIngredient: (ingredientName) => {
      dispatch(actionCreators.removeIngredients(ingredientName));
    },
    onFetchIngredients: () => dispatch(actionCreators.fetchIngredients()),
    onPurchaseInit: () => dispatch(actionCreators.purchaseInit()),
    onRedirectAfterAuth: (path) =>
      dispatch(actionCreators.setRedirectAfterAuth(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
