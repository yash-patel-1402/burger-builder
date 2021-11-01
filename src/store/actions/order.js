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

const getOrdersStart = (error) => {
  return {
    type: actionTypes.GET_ORDERS_START,
  };
};

export const getAllOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(getOrdersStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get('/orders.json' + queryParams)
      .then((response) => {
        dispatch(setOrders(response.data));
      })
      .catch((error) => {
        dispatch(getOrdersFailed(error));
      });
  };
};
