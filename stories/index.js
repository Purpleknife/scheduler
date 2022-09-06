import React from "react"; //Optional since we have a newer version of React (above v17).

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import days from './data/daysData'; //To fetch the days array used in DayList.
import interviewer from './data/interviewerData'; //To fetch the interviewer obj used in InterviewerListItem.
import interviewers from './data/interviewersData'; //To fetch the interviewers array used in InterviewerList.

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment"; //Will go directly to index.js since it's the default module for a folder.
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

/* 
===> Initiates Storybook and registers our Button component.
- .addParameters() provides the default background color for our component.
- .add() is called to generate a story.
- action() is added to create a callback that appears in the Actions panel when clicked.
*/
storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));


/* 
===> Initiates Storybook and registers our DayListItem component.
*/
storiesOf("DayListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />)
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
  ));


/* 
===> Initiates Storybook and registers our DayList component.
*/
storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} value={"Monday"} onChange={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} value={"Tuesday"} onChange={action("setDay")} />
  ))
  .add("Wednesday", () => (
      <DayList days={days} value={"Wednesday"} onChange={action("setDay")} />
  ));


/* 
===> Initiates Storybook and registers our InterviewerListItem component.
*/

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={() => action("setInterviewer")(interviewer.id)}
    />
  ));


/* 
===> Initiates Storybook and registers our InterviewerList component.
*/

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
    />
  ))
  .add("Selected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
    />
  ))
  .add("Clickable", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("setInterviewer")}
    />
  ));


/* 
===> Initiates Storybook and registers our Appointment component.
*/

storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => 
    <Appointment />
  )
  .add("Appointment with Time", () => 
    <Appointment time='12pm' />
  )
  .add("Header", () => 
    <Header time='12pm' />
  )
  .add("Empty", () => 
    <Empty onAdd={action('onAdd')} />
  )
  .add("Show", () => 
    <Show 
      student='Lydia Miller-Jones'
      interviewer={interviewer}
      onEdit={action('onEdit')}
      onDelete={action('onDelete')}
    />
  )
  .add("Confirm", () => 
    <Confirm 
      message='Delete the appointment?'
      onConfirm={action('onConfirm')}
      onCancel={action('onCancel')}
    />
  )
  .add("Status", () => 
    <Status message='Deleting' />
  )
  .add("Error", () => 
    <Error 
      message='Could not delete appointment.'
      onClose={action('onClose')}
    />
  )
  .add("Edit", () => 
    <Form 
      student='Jane Doe'
      interviewer={1}
      interviewers={interviewers}
      onSave={action('onSave')}
      onCancel={action('onCancel')}
    />
  )
  .add("Create", () => 
    <Form 
      interviewers={interviewers}
      onSave={action('onSave')}
      onCancel={action('onCancel')}
    />
  );
