import { configureStore } from "@reduxjs/toolkit";
import { propSlice } from "./reducers/propsReducers";

// congifureStore that takes in a reducer
export const store = configureStore({
  reducer: {
    application: propSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
