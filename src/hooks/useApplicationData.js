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
      case SET_INTERVIEW: //Implement the spots remaining functionality inside SET_INTERVIEW.
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

        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview ? { ...action.interview } : null
        };
    
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };

        return {
          ...state,
          days: updateSpots(state.days, appointments),
          appointments
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

    //WebSocket implementation:
    const URL = process.env.REACT_APP_WEBSOCKET_URL;
    const ws = new WebSocket(URL);

      ws.addEventListener('message', (event) => {
        const { type, id, interview } = JSON.parse(event.data);

        if (type === 'SET_INTERVIEW') {
          dispatch({ type, id, interview });
        }
      });
    return () => ws.close(); //To close the ws connection.
    

  }, []); //The empty dependency array added prevents an infinite loop.

  

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview })
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null }) //Update appointments and remaining spots.
      })
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