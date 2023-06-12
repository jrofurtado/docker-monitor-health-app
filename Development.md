# Docker-Monitor-App

## Docker-Monitor-App

the main goal of this app is a way to monitor the docker containers and the logs of the containers and show the differences between the logs and using the healthCheck of the containers to show the status of the containers.

## How to run

1. clone the repo
2. run `npm install`
3. run `docker-compose -f docker-compose.yml build`
4. run `docker-compose -f docker-compose.yml up `
5. to shutdown run `docker-compose -f docker-compose.yml down `

## how to set the keycloak

1. go to `http://172.17.0.1/auth/` and login with the admin credentials
2. go to `Clients` and click on `Create`
3. put the `Client ID` and click on `Save`
4. go to `Credentials` and copy the `Secret`
5. go to `Users` and click on `View all users`
6. click on `Add user`
7. put the `Username` and click on `Save`
8. go to `Credentials` and put the `Password` and click on `Set Password`
9. go to `Role Mappings` and click on `Client Roles`
10. select the `Client ID` and click on `Add selected`

## How to use

1. open browser and go to `172.17.0.1`
2. Put the credentials
3. Click on `App Name` to see the projects
4. Click on `Server Name` to see the server logs
5. Click on `Server Log` to see the server information on as specific log
6. Click on the dropdown to see each container Information

## Main dependencies

1. Use of Redux Toolkit to manage the state: `@reduxjs/toolkit`
2. Use of React Router to manage the routes: `react-router-dom`
3. Use of React Hooks to manage the state: `useState`, `useEffect`, `useSelector`, `useDispatch`
4. Use of Material UI to manage the UI: `@material-ui/core`, `@material-ui/icons`
5. Use of Axios to manage the API calls: `axios`
6. Use of react-diff-view to show the differences between the logs: `react-diff-viewer-continued`
7. Use Of Keycloak to manage the authentication: `keycloak-js`

## Folder Structure

1. `src` folder contains the main code
2. `src/components/App ` contains the main app
3. `src/components/ApplicationsList` contains the ApplicationsList components
4. `src/components/DatePickers` contains the DatePickers components
5. `src/components/Header` contains the Header component
6. `src/components/Pages` contains the Pages components
7. `src/components/Service` contains the Service components like the ServiceHistory and ServiceInformation
8. `src/components/Status` contains the Status components
9. `src/webnotification` contains the webnotification component
10. `src/mocks` contains the mocks for the API calls to make the front-end development easier
11. `src/redux-store` contains the redux store and the reducers
12. `src/resources` contains the resources like interfaces and requests
