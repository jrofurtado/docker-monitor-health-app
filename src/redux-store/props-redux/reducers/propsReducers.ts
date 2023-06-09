import { createSlice } from "@reduxjs/toolkit";

export const propSlice = createSlice({
  name: "prop",
  initialState: {
    appName: "",
    serviceName: "",
    headerTitle: "",
    newApplications: [],
    newNotificationStatus: { global: false, apps: [] },
    timeStamp: 0,
    searchTimeStamp: 0,
  },
  reducers: {
    setAppName: (state, action) => {
      state.appName = action.payload;
    },
    setServiceName: (state, action) => {
      state.serviceName = action.payload;
    },
    setHeaderTitle: (state, action) => {
      state.headerTitle = action.payload;
    },
    setNewApplications: (state, action) => {
      state.newApplications = action.payload;
    },
    setNewNotificationStatus: (state, action) => {
      state.newNotificationStatus = action.payload;
    },
    setTimeStamp: (state, action) => {
      state.timeStamp = action.payload;
    },
    setSearchTimeStamp: (state, action) => {
      state.searchTimeStamp = action.payload;
    },
  },
});

export const {
  setAppName,
  setServiceName,
  setHeaderTitle,
  setNewApplications,
  setNewNotificationStatus,
  setTimeStamp,
  setSearchTimeStamp,
} = propSlice.actions;
export default propSlice.reducer;
