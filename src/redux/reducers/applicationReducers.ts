import { ApplicationInterface } from '../../resources/interfaces';

interface Action {
  type: string;
  payload: { newApplications: Array<ApplicationInterface> };
}

interface State {
  list: Array<ApplicationInterface>;
}

const initialState = {
  list: [],
};

const applications = (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'SET_APPLICATIONS':
      return {
        ...state,
        list: action.payload.newApplications,
      };
    default:
      return state;
  }
};

export default applications;
