import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
  {},
  {
    getAdminStatsRequest: state => {
      state.loading = true;
    },

    getAdminStatsSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload.stats;
      state.userCount = action.payload.userCount;
      state.subscriptionCount = action.payload.subscriptionCount;
      state.viewsCount = action.payload.viewsCount;
      state.subscriptionPercentage = action.payload.subscriptionPercentage;
      state.viewsPercentage = action.payload.viewsPercentage;
      state.userPercentage = action.payload.userPercentage;
      state.subscriptionProfit = action.payload.subscriptionProfit;
      state.viewsProfit = action.payload.viewsProfit;
      state.userProfit = action.payload.userProfit;
    },

    getAdminStatsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllUsersRequest: state => {
      state.loading = true;
    },

    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },

    getAllUsersFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUsersRoleRequest: state => {
      state.loading = true;
    },

    updateUsersRoleSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    updateUsersRoleFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteUsersRequest: state => {
      state.loading = true;
    },

    deleteUsersSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    deleteUsersFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createCourseRequest: state => {
      state.loading = true;
    },

    createCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    createCourseFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteCourseRequest: state => {
      state.loading = true;
    },

    deleteCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    deleteCourseFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addLectureRequest: state => {
      state.loading = true;
    },

    addLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    addLectureFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteLectureRequest: state => {
      state.loading = true;
    },

    deleteLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    deleteLectureFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
