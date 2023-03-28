import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Action {
  type: string;
  payload: {
    date: string;
    time: string;
  };
}
interface State {
  date: string;
  time: string;
}

const searchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_DATE":
      state.date = action.payload.date;
      state.time = action.payload.time;
      return { ...state };
    case "SET_TIME":
      state.date = action.payload.date;
      state.time = action.payload.time;
      return { ...state };
    default:
      return state;
  }
};

export default searchReducer;
