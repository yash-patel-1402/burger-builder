import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

const purchaseSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    payload: {
      orderId,
      orderData,
    },
  };
};

const purchaseFail = (error) => {
  return {
    type: actionTypes.PURCHASE_FAIL,
    payload: {
      error,
    },
  };
};

const setPurchaseLoading = () => {
  return {
    type: actionTypes.PURCHASE_LOADING_SET,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const purchasePost = (orderData, token) => {
  return (dispatch) => {
    dispatch(setPurchaseLoading());
    axios
      .post('/orders.json?auth=' + token, orderData)
      .then((response) => {
        console.log(response);
        dispatch(purchaseSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        console.log(error);
        dispatch(purchaseFail(error));
      });
  };
};

const setOrders = (orders) => {
  return {
    type: actionTypes.SET_ORDERS,
    payload: { orders },
  };
};

const getOrdersFailed = (error) => {
  return {
    type: actionTypes.GET_ORDERS_FAILED,
    payload: { error },
  };
};

const getOrdersStart = (error) => {
  return {
    type: actionTypes.GET_ORDERS_START,
  };
};

export const getAllOrders = (token) => {
  return (dispatch) => {
    dispatch(getOrdersStart());
    axios
      .get('/orders.json?auth=' + token)
      .then((response) => {
        dispatch(setOrders(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getOrdersFailed(error));
      });
  };
};
