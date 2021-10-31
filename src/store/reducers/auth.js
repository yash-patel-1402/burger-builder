import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  userId: null,
  token: null,
  loading: false,
  redirectAfterAuth: '/',
};

const authStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const authSuccess = (state, { token, userId }) => {
  return {
    ...state,
    loading: false,
    error: null,
    userId,
    token,
  };
};

const authFail = (state, { error }) => {
  // console.log(error);
  return {
    ...state,
    loading: false,
    error,
  };
};

const authLogout = (state) => {
  return {
    ...state,
    loading: false,
    error: null,
    userId: null,
    token: null,
  };
};

const setRedirectAfterAuth = (state, { path }) => {
  return {
    ...state,
    redirectAfterAuth: path,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action.payload);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action.payload);
    case actionTypes.AUTH_LOG_OUT:
      return authLogout(state);
    case actionTypes.REDIRECT_AFTER_AUTH:
      return setRedirectAfterAuth(state, action.payload);
    default:
      return state;
  }
};
export default reducer;
