/*
Selector: function that accepts state as an argument,
and returns data that is derived from that state.

=> These functions's goal is to transform the data we get
from the API into a data structure that we can use in our components.
*/

export const getAppointmentsForDay = (state, day) => {

  const appointmentsForGivenDay = state.days.filter(oneDay => oneDay.name === day)[0]; //The [0] is because we want the obj inside the array.
  
  if (!appointmentsForGivenDay) { //If no appointments on a given day, days data should be an empty array,
    return [];
  };
  
  const getDetailledAppointments = appointmentsForGivenDay.appointments.map(appointmentID => state.appointments[appointmentID]); //Based on the id, fetch the corresponding appointments from the array appointments that's inside appointmentsForGivenDay.
  
  return getDetailledAppointments;
};



export const getInterview = (state, interview) => {
  let output = {};

  if (!interview) { // If no data is passed, return null.
    return null;
  };

  const interviewerID = interview.interviewer; //interview = appointment.interview ==> interview: { student: "Chad Takahashi", interviewer: 2 }.
  const interviewer = state.interviewers[interviewerID];

  output.student = interview.student;
  output.interviewer = interviewer;

  return output;  
};

