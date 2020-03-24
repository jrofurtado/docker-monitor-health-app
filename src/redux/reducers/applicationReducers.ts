interface action {
  type: string;
  payload: { newApplications: Array<String> };
}

const initialState = {
  list: []
};

const applications = (state = initialState, action: action) => {
  switch (action.type) {
    case "SET_APPLICATIONS":
      return {
        ...state,
        list: [...action.payload.newApplications]
      };
    default:
      return state;
  }
};

export default applications;
