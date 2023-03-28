interface Action {
  type: string;
  payload: {
    date: string;
    time: string;
  };
}

const setTime = (time: string) => {
  return {
    type: "SET_TIME",
    payload: { time: time },
  };
};

const setDate = (date: string) => {
  return {
    type: "SET_DATE",
    payload: { date: date },
  };
};

export default { setDate, setTime };
