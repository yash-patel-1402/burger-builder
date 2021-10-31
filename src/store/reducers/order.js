import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_SUCCESS:
      return purchaseSuccess(state, action.payload);
    case actionTypes.PURCHASE_FAIL:
      return purchaseFail(state, action.payload.error);
    case actionTypes.PURCHASE_LOADING_SET:
      return purchaseLoadingSet(state);
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);
    case actionTypes.SET_ORDERS:
      return setOrders(state, action.payload.orders);
    case actionTypes.GET_ORDERS_FAILED:
      return getOrdersFailed(state, action.payload.error);
    case actionTypes.GET_ORDERS_START:
      return getOrdersStart(state);
    default:
      return state;
  }
};

const purchaseInit = (state) => {
  return {
    ...state,
    purchased: false,
  };
};

const purchaseLoadingSet = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const purchaseSuccess = (state, { orderId, orderData }) => {
  // console.log(state);
  return {
    ...state,
    orders: state.orders.concat({ ...orderData, id: orderId }),
    loading: false,
    purchased: true,
  };
};

const purchaseFail = (state, error) => {
  return {
    ...state,
    loading: false,
  };
};

const setOrders = (state, orders) => {
  const transformedOrders = [];
  for (let key in orders) {
    transformedOrders.push({ orderId: key, ...orders[key] });
  }
  return {
    ...state,
    orders: transformedOrders,
    error: null,
    loading: false,
  };
};

const getOrdersStart = (state) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const getOrdersFailed = (state, error) => {
  return {
    ...state,
    error: true,
    loading: false,
  };
};

export default reducer;
