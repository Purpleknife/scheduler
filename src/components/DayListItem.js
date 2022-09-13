import React from 'react';
import classNames from 'classnames';

import 'components/DayListItem.scss';

const DayListItem = (props) => {

  const formatSpots = (spots) => {
    if (spots === 0) {
      return `no spots remaining`;
    }
    if (spots === 1) {
      return `1 spot remaining`;
    }
    return `${spots} spots remaining`;
  };

  const noSpots = props.spots === 0;
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': noSpots
  });

  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
};
 
export default DayListItem;