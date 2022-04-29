import {
  ApplicationInterface,
  NotificationStatusInterface,
} from "../../resources/interfaces";

interface Action {
  type: string;
  payload: {
    newApplications: Array<ApplicationInterface>;
    newNotificationStatus: NotificationStatusInterface;
  };
}

interface State {
  list: Array<ApplicationInterface>;
  notificationStatus: NotificationStatusInterface;
}

const initialState = {
  list: [],
  notificationStatus: { global: false, apps: [] },
};

const applications = (state = initialState, action: Action): State => {
  switch (action.type) {
    case "SET_APPLICATIONS":
      return {
        ...state,
        list: action.payload.newApplications,
      };
    case "SET_NOTIFICATION_STATUS":
      return {
        ...state,
        notificationStatus: action.payload.newNotificationStatus,
      };
    default:
      return state;
  }
};

export default applications;
