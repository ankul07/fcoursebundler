import { server } from '../store';
import axios from 'axios';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginfailed', payload: error.response.data.message });
  }
};

//register
export const register = formdata => async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });

    const { data } = await axios.post(`${server}/register`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    console.log(data);
    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'registerfailed', payload: error.response.data.message });
  }
};

//get my profile

export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(
      `${server}/me`,

      {
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'loadUserfailed', payload: error.response.data.message });
  }
};

//logout user
export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.get(
      `${server}/logout`,

      {
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutfailed', payload: error.response.data.message });
  }
};

export const buySubscription = () => async dispatch => {
  try {
    dispatch({ type: 'buySubscriptionRequest' });

    const { data } = await axios.get(
      `${server}/subscribe`,

      {
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });
  } catch (error) {
    dispatch({
      type: 'buySubscriptionFailed',
      payload: error.response.data.message,
    });
  }
};

export const cancelSubscription = () => async dispatch => {
  try {
    dispatch({ type: 'cancelSubscriptionRequest' });

    const { data } = await axios.delete(
      `${server}/subscribe/cancel`,

      {
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({
      type: 'cancelSubscriptionSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'cancelSubscriptionFailed',
      payload: error.response.data.message,
    });
  }
};
