/*
Selector: function that accepts state as an argument,
and returns data that is derived from that state.
*/

export const getAppointmentsForDay = (state, day) => {

  const appointmentsForGivenDay = state.days.filter(oneDay => oneDay.name === day)[0]; //The [0] is because we want the obj inside the array.
  
  if (!appointmentsForGivenDay) { //If no appointments on a given day, days data should be an empty array,
    return [];
  };
  
  const getDetailledAppointments = appointmentsForGivenDay.appointments.map(appointmentID => state.appointments[appointmentID]); //Based on the id, fetch the corresponding appointments from the array appointments that's inside appointmentsForGivenDay.
  
  return getDetailledAppointments;
};

