import { server } from '../store';
import axios from 'axios';

export const contactUs = (name, email, message) => async dispatch => {
  try {
    dispatch({ type: 'contactRequest' });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${server}/contact`,
      { name, email, message },
      config
    );

    dispatch({ type: 'contactSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'contactFail',
      payload: error.response.data.message,
    });
  }
};

export const courseRequestt = (name, email, course) => async dispatch => {
  try {
    dispatch({ type: 'courseRequest' });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${server}/courserequest`,
      { name, email, course },
      config
    );

    dispatch({ type: 'courseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'courseFail',
      payload: error.response.data.message,
    });
  }
};
