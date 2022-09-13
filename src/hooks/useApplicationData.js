import { useEffect, useReducer } from 'react';
import axios from 'axios';


const useApplicationData = () => {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  
  const reducer = (state, action) => {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.day
        }
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        }
      case SET_INTERVIEW:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
        }
      
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  };
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };
  

  const [state, dispatch] = useReducer(reducer, initialState);

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers'),
    ]).then((all) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        });
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

    return updatedDays;
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

    const days = updateSpots(state.days, appointments);

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(
        dispatch({ type: SET_INTERVIEW, appointments, days }),
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

    const days = updateSpots(state.days, appointments);

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(
        dispatch({ type: SET_INTERVIEW, appointments, days }),
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