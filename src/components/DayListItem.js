import React from 'react'; //Optional since we have a newer version of React (above v17).
import classNames from 'classnames';

import 'components/DayListItem.scss';

const DayListItem = (props) => {
  const noSpots = props.spots === 0;

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': noSpots
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
};
 
export default DayListItem;