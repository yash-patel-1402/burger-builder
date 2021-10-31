import * as actionTypes from './actionTypes';
import axios from '../../axios-auth';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: { error },
  };
};

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { token, userId },
  };
};

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOG_OUT,
  };
};

const expirationLogout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    let url = '/accounts:signUp?key=AIzaSyAikMvHqHXUSBvBWdMiBz8wJHucM4FbSfU';
    if (!isSignUp) {
      url =
        '/accounts:signInWithPassword?key=AIzaSyAikMvHqHXUSBvBWdMiBz8wJHucM4FbSfU';
    }

    axios
      .post(url, data)
      .then((response) => {
        // console.log(response);
        const userId = response.data.localId;
        const token = response.data.idToken;
        const expirationTime = response.data.expiresIn;
        const expirationDate = new Date(
          new Date().getTime() + expirationTime * 1000
        );
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(token, userId));
        dispatch(expirationLogout(expirationTime));
      })
      .catch((error) => {
        // console.log(error.response.data.error);
        if (error.response) {
          dispatch(authFail(error.response.data.error));
        } else {
          dispatch(authFail(error));
        }
      });
  };
};

export const setRedirectAfterAuth = (path) => {
  return {
    type: actionTypes.REDIRECT_AFTER_AUTH,
    payload: { path },
  };
};

export const autoAuth = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        const expirationTime = expirationDate.getTime() - new Date().getTime();
        dispatch(expirationLogout(expirationTime / 1000));
      }
    } else {
      dispatch(authLogout());
    }
  };
};
