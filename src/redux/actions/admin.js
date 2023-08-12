import { server } from '../store';
import axios from 'axios';

export const createCourse = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    dispatch({ type: 'createCourseRequest' });

    const { data } = await axios.post(
      `${server}/createcourse`,
      formData,
      config
    );
    dispatch({ type: 'createCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'createCourseFailed',
      payload: error.response.data.message,
    });
  }
};

export const deleteCourse = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteCourseRequest' });

    const { data } = await axios.delete(`${server}/course/${id}`, config);
    dispatch({ type: 'deleteCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteCourseFailed',
      payload: error.response.data.message,
    });
  }
};

export const addLecture = (id, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    dispatch({ type: 'addLectureRequest' });

    const { data } = await axios.post(
      `${server}/course/${id}`,
      formData,
      config
    );
    dispatch({ type: 'addLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addLectureSuccess',
      payload: error.response.data.message,
    });
  }
};

export const deleteLecture = (courseid, lectureId) => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteLectureRequest' });

    const { data } = await axios.delete(
      `${server}/lecture?courseid=${courseid}&lectureId=${lectureId}`,

      config
    );
    dispatch({ type: 'deleteLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteLectureSuccess',
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'getAllUsersRequest' });

    const { data } = await axios.get(
      `${server}/admin/users`,

      config
    );
    dispatch({ type: 'getAllUsersSuccess', payload: data.users });
  } catch (error) {
    dispatch({
      type: 'getAllUsersFailed',
      payload: error.response.data.message,
    });
  }
};

export const updateUsersRole = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'updateUsersRoleRequest' });

    const { data } = await axios.put(`${server}/admin/user/${id}`, {}, config);
    dispatch({ type: 'updateUsersRoleSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateUsersRoleFailed',
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteUsersRequest' });

    const { data } = await axios.delete(`${server}/admin/user/${id}`, config);
    dispatch({ type: 'deleteUsersSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteUsersFailed',
      payload: error.response.data.message,
    });
  }
};

export const getDashboardStats = () => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'getAdminStatsRequest' });

    const { data } = await axios.get(`${server}/admin/stats`, config);
    dispatch({ type: 'getAdminStatsSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getAdminStatsFailed',
      payload: error.response.data.message,
    });
  }
};
