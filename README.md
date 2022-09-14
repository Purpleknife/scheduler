# Interview Scheduler

Interview Scheduler is a React app that allows you to book, edit or cancel appointments.

This project's goals were:
- Build a SPA with React.
- Get familiar with React and the concepts of components and hooks.
- Get familiar with unit, integration and E2E testing.

## Features

- A user can book an appointment between Monday and Friday.
- A user can book, edit or cancel their appointments.
- The number of spots remaining updates whenever an appointment is booked or canceled.
- Real time updates between different users thanks to WebSocket.


## Getting Started

- `git clone` this project.
- Install dependencies with `npm install`.
- Run Webpack Development Server with `npm start`.
- To run your tests:
    - Run Jest Test Framework with `npm test`.
    - Running Storybook Visual Testbed with `npm run storybook`.
    - Run Cypress with `npm run cypress`.

## Dependencies

- React
- Babel
- Storybook
- Cypress
- Jest
- Prop-Types
- Axios
- Classnames
- CSS
- SASS

## Additional Info

- The server for this app runs on port 8001, through an another repo: `scheduler-api`.
- The server is deployed to Heroku.
- The client is deployed to [Netlify](https://63223761156ffb57923ff85c--superb-babka-0af46b.netlify.app/) (*The data may take some time to load if the Heroku hosted server has been initialized more than 30min ago*).
- The testing runs through CircleCI and deploys from master branch to production branch.


## Final Product

### App Overview:

!["App overview"](https://github.com/Purpleknife/scheduler/blob/master/docs/app-overview.png?raw=true)
!["Create an appointment"](https://github.com/Purpleknife/scheduler/blob/master/docs/create-appointment.png?raw=true)
!["Delete an appointment"](https://github.com/Purpleknife/scheduler/blob/master/docs/delete-appointment.png?raw=true)

### Testing results:

!["Test coverage"](https://github.com/Purpleknife/scheduler/blob/master/docs/code-test-coverage.png?raw=true)
!["Storybook"](https://github.com/Purpleknife/scheduler/blob/master/docs/storybook-tests.png?raw=true)
!["Cypress"](https://github.com/Purpleknife/scheduler/blob/master/docs/cypress-tests.png?raw=true)