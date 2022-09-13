/*
Reducer function used in useApplicationData hook.
*/


export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

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

export default reducer;