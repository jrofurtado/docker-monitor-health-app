import { ApplicationInterface } from "../../resources/interfaces";

const addApplication = (newApplications: Array<ApplicationInterface>) => {
  return {
    type: "SET_APPLICATIONS",
    payload: { newApplications: newApplications }
  };
};

export default {
  addApplication
};
