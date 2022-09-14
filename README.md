# Interview Scheduler

Interview Scheduler is a React app that allows you to book, edit or cancel appointments.


## Features

- A user can book an appointment between Monday and Friday.
- A user can book, edit or cancel their appointments.
- The number of spots remaining updates whenever an appointment is booked or canceled.
- Real time updates between different users thanks to WebSocket.


## Getting Started

1- `git clone` this project.
2- Install dependencies with `npm install`.
3- Run Webpack Development Server with `npm start`.
4- To run your tests:
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
- SASS

## Additional Info

- The server for this app runs on port 8001, through an another repo: `scheduler-api`.
- The server is deployed to Heroku.
- The client is deployed to Netlify.
- The testing runs through CircleCI and deploys from master branch to production branch.


## Final Product

### App Overview:

!["App overview"]()
!["Create an appointment"]()
!["Delete an appointment"]()

### Testing results:

!["Test coverage"]()
!["Storybook"]()
!["Cypress"]()