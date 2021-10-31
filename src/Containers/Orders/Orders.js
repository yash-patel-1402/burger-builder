import React, { Component } from 'react';

import axios from '../../axios-order';
import Order from '../../Components/Order/Order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

export class Orders extends Component {
  componentDidMount() {
    this.props.loadAllOrders();
  }

  render() {
    let orders = <Spinner />;
    if (this.props.orders) {
      if (this.props.error) {
        orders = (
          <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
            Something gone wrong!
          </p>
        );
      } else {
        orders = Object.keys(this.props.orders).map((orderKey) => {
          const order = this.props.orders[orderKey];
          return (
            <Order
              key={orderKey}
              ingredients={order.ingredients}
              price={order.price}
            />
          );
        });
      }
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    error: state.order.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllOrders: () => dispatch(actionCreators.getAllOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
