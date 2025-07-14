// src/actions/AuthAction.js
import * as AuthApi from '../api/AuthRequest.js';

// Login Action
export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: 'AUTH_SUCCESS', data });
  } catch (error) {
    dispatch({ type: 'AUTH_FAIL' });
    throw error; // 🔥 Rethrow so component can show error
  }
};

// Signup Action
export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: 'AUTH_SUCCESS', data });
  } catch (error) {
    dispatch({ type: 'AUTH_FAIL' });
    throw error; // 🔥 Rethrow so component can show error
  }
};

// Logout Action
export const logOut = () => async (dispatch) => {
  dispatch({ type: 'LOG_OUT' });
};
