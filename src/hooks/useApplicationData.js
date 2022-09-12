import { useEffect, useState } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers'),
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
    .catch((error) => {
      console.error(error);
    });
  }, []); //The empty dependency array added prevents an infinite loop.

  
  const updateSpots = (days, appointments) => {
    const currentDay = days.find(day => day.name === state.day);

    const appointIDs = currentDay.appointments;
    const nullInterviews = appointIDs.filter((id) => !appointments[id].interview); //Get the number of appointments where interview is null.
    const spotsAvailable = nullInterviews.length;
      
    const updatedDay = { ...currentDay, spots: spotsAvailable }; //Update the day without altering the original obj.

    const currentDayIndex = days.findIndex(day => day.name === state.day); //Find the index so we can update the array days.
    const updatedDays = [...days];
    updatedDays[currentDayIndex] = updatedDay; //Update the days, done this way because it's an array, unlike 'day'.

    setState(prev => ({...prev, days: updatedDays})); //Update the state.
  };


  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(
        setState((prev) => ({...prev, appointments})),
        updateSpots(state.days, appointments)
      )
      .catch((error) => {
        console.error(error);
      });
    
  };


  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(
        setState((prev) => ({...prev, appointments})),
        updateSpots(state.days, appointments)
      )
      .catch((error) => {
        console.error(error);
      });
  };


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};

export default useApplicationData;