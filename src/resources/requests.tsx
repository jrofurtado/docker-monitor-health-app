import axios from "axios";

export async function getApps(): Promise<Array<String> | void> {
  return await axios
    .get("/api/apps")
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log("Error: ", error);
    });
}
