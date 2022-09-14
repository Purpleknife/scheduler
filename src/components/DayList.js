import React from 'react';

import DayListItem from './DayListItem';


const DayList = (props) => {

  const daysData = props.days;
  const listDays = daysData.map((day) => {
    return (
      <DayListItem
        key={day.id}
        id={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return ( 
    <ul>{listDays}</ul>
  );
};
 
export default DayList;
