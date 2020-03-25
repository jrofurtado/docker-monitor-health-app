import { ApplicationInterface } from "../../resources/interfaces";

interface action {
  type: string;
  payload: { newApplications: Array<ApplicationInterface> };
}

const initialState = {
  list: []
};

const applications = (state = initialState, action: action) => {
  switch (action.type) {
    case "SET_APPLICATIONS":
      return {
        ...state,
        list: action.payload.newApplications
      };
    default:
      return state;
  }
};

export default applications;
