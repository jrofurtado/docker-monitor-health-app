const ROUTES = {
  LOGIN: "/",
  APPLICATIONS: "/applications",
  SERVER: function (app?: string, server?: string) {
    return `${this.APPLICATIONS}/${app || ":app"}/${server || ":server"}`;
  },
};

export default ROUTES;
