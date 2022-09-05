import React from 'react'; //Optional since we have a newer version of React (above v7).

const DayListItem = (props) => {
  return (
    <li>
      <h2 className="text--regular">Day Name</h2> 
      <h3 className="text--light">X spots remaining</h3>
    </li>
  );
}
 
export default DayListItem;