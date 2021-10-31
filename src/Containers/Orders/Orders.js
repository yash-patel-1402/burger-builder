import React, { Component } from 'react';

import axios from '../../axios-order';
import Order from '../../Components/Order/Order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import { Redirect } from 'react-router';

export class Orders extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      prevToken: this.props.token,
    };
  }

  componentDidUpdate() {
    if (this.state.prevToken != this.props.token) {
      this.setState({ prevToken: this.props.token });

      this.props.loadAllOrders(this.props.token);
    }
  }

  componentDidMount() {
    if (this.props.token) {
      this.props.loadAllOrders(this.props.token);
    }
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
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
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllOrders: (token) => dispatch(actionCreators.getAllOrders(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
