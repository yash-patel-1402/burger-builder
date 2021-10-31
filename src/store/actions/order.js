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

export const purchasePost = (orderData) => {
  return (dispatch) => {
    dispatch(setPurchaseLoading());
    axios
      .post('/orders.json', orderData)
      .then((response) => {
        dispatch(purchaseSuccess(response.data.name, orderData));
      })
      .catch((error) => {
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

export const getAllOrders = () => {
  return (dispatch) => {
    axios
      .get('/orders.json')
      .then((response) => {
        dispatch(setOrders(response.data));
      })
      .catch((error) => {
        dispatch(getOrdersFailed(error));
      });
  };
};
