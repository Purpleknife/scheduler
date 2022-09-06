import React from 'react'; //Optional since we have a newer version of React (above v17).
import classNames from 'classnames';

import 'components/InterviewerListItem.scss';

const InterviewerListItem = (props) => {
  const interviewButton = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected
  });

  return ( 
    <li className={interviewButton} onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};
 
export default InterviewerListItem;