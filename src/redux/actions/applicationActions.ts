import { ApplicationInterface } from '../../resources/interfaces';

interface ActionAddApplication {
  type: string;
  payload: {
    newApplications: Array<ApplicationInterface>;
  };
}

const addApplication = (
  newApplications: Array<ApplicationInterface>
): ActionAddApplication => {
  return {
    type: 'SET_APPLICATIONS',
    payload: { newApplications: newApplications },
  };
};

export default {
  addApplication,
};
