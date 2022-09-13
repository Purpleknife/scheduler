import { useEffect, useReducer } from 'react';
import axios from 'axios';

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";


const useApplicationData = () => { 

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
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
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
    webSocketUpdate();
    

  }, []); //The empty dependency array added prevents an infinite loop.

  

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview })
      })
      .catch((error) => {
        console.error('Could not complete PUT request:', error);
      });
  };


  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null }) //Update appointments and remaining spots.
      })
      .catch((error) => {
        console.error('Could not complete DELETE request:', error);
      });
  };


  const webSocketUpdate = () => {
    const URL = process.env.REACT_APP_WEBSOCKET_URL;
    const ws = new WebSocket(URL);
  
      ws.addEventListener('message', (event) => {
        const { type, id, interview } = JSON.parse(event.data);
  
        if (type === 'SET_INTERVIEW') {
          dispatch({ type, id, interview });
        }
      });
    return () => ws.close(); //To close the ws connection.
  };


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};

export default useApplicationData;