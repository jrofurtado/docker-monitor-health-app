import { ApplicationInterface, ServerInterface } from "../resources/interfaces";

export async function mockApps() {
  return ["monitor", "globaleda", "dra"];
}

export async function getStatus(): Promise<Array<ApplicationInterface> | void> {
  // Mock Response
  const response = {
    monitor: { "docker-desktop": { healthy: true, containers: 13 } },
    globaleda: {
      development: { healthy: true, containers: 5 },
      production: { healthy: false, containers: 7 }
    },
    lagoa: {
      development: { healthy: true, containers: 6 },
      production: { healthy: true, containers: 9 }
    }
  };
  // Create an Array with ApplicationInterface Objects
  let apps: Array<ApplicationInterface> = [];
  for (const [key, value] of Object.entries(response)) {
    const appName = key;
    let appHealthy = true;
    let servers: Array<ServerInterface> = [];
    for (const [serverKey, serverValue] of Object.entries(value)) {
      if (!serverValue.healthy) {
        appHealthy = false;
      }
      servers.push({
        name: serverKey,
        status: serverValue
      });
    }
    apps.push({
      name: appName,
      healthy: appHealthy,
      servers: servers
    });
  }
  return apps;
}

const allMocks = {
  getStatus
};

export default allMocks;
