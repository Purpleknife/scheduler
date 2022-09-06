import React, { useState } from 'react'; //Importing React is optional since we have a newer version of React (above v17).

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from 'components/Appointment';

const days = [ //Couldn't import it from "../../stories/data/daysData" since it falls outside the /src directory.
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};


const Application = (props) => {
  const [day, setDay] = useState('Monday');
  console.log(day);

  const appointmentsArray = Object.values(appointments); //Turn appointments obj into an array.
  const appointmentsList = appointmentsArray.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
      />
    );
  })

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      
      <nav className="sidebar__menu">
      <DayList
        days={days}
        value={day}
        onChange={setDay}
      />
      </nav>
      
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointmentsList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};
 
export default Application;
