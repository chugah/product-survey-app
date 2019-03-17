import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, FETCH_USER } from './types';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:5000/signup', formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch(err) {
    dispatch({ type: AUTH_ERROR, payload: 'Email already exists.' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');
  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:5000/signin', formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch(err) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid email or password.' });
  }
};

export const fetchUser = () => {
  return function(dispatch) {
    axios.get('/api/current_user')
      .then(response => dispatch({type: FETCH_USER, payload: response }));
  };
};
