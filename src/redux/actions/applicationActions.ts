const addApplication = (newApplications: Array<String>) => {
  return {
    type: "SET_APPLICATIONS",
    payload: { newApplications: newApplications }
  };
};

export default {
  addApplication
};
