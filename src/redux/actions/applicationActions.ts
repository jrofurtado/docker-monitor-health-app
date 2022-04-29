import {
  ApplicationInterface,
  NotificationStatusInterface,
} from "../../resources/interfaces";

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
    type: "SET_APPLICATIONS",
    payload: { newApplications: newApplications },
  };
};

interface ActionAddNotificationStatus {
  type: string;
  payload: {
    newNotificationStatus: NotificationStatusInterface;
  };
}

const addNotificationStatus = (
  newNotificationStatus: NotificationStatusInterface
): ActionAddNotificationStatus => {
  return {
    type: "SET_NOTIFICATION_STATUS",
    payload: { newNotificationStatus: newNotificationStatus },
  };
};

export default {
  addApplication,
  addNotificationStatus,
};
