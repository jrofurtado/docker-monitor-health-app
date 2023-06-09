# Docker-Monitor-App

## Docker-Monitor-App

app to monitor docker containers health and status

## How to run

1. clone the repo
2. run `npm install`
3. run `docker-compose -f docker-compose.yml build`
4. run `docker-compose -f docker-compose.yml up `
5. to shutdown run `docker-compose -f docker-compose.yml down `

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
6. Use of react-diff-view to show the differences between the logs: `react-diff-view`

## How Redux Toolkit was used

1. Create the store
2. Create the reducers
3. Create the actions
4. Create the selectors
5. Create the slices

## How React Router was used

1. Create the routes
2. Create the links

## How React Hooks was used

1. Create the state
2. Create the effects
3. Create the selectors
4. Create the dispatchers

## How Material UI was used

1. Use of the components
2. Use of the icons
3. Styling the components

## How Axios was used

1. Create the API calls with base in the backend
