import axios from "axios";
// TypeScript
import { ApplicationKey } from "./interfaces";

export async function getApplicationNamesList(): Promise<Array<String> | void> {
  return await axios
    .get("/api/apps")
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log("getApplicationNamesList Error: ", error);
    });
}

async function getApplicationId(
  appName: String
): Promise<ApplicationKey | void> {
  return await axios
    .get(`/api/app?appName=${appName}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log("getApplicationId Error: ", error);
    });
}

/*
export async function getApplicationList(): Promise<Array<Application> | void> {
  const applicationList: Array<Application> = [];
  return await axios
    .get("/api/apps")
    .then(response => {
      let inc = 0;
      response.data.forEach((applicationName: String) => {
        getApplicationId(applicationName).then(res => {
          inc++;
          if (res) {
            applicationList.push({ name: applicationName, key: res.key });
          } else {
            applicationList.push({
              name: applicationName,
              key: inc.toString()
            });
          }
        });
      });
      return applicationList;
    })
    .catch(error => {
      console.log("getApplicationList Error: ", error);
    });
}*/
