import React from 'react'; //Optional since we have a newer version of React (above v7).

const DayListItem = (props) => {
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}
 
export default DayListItem;