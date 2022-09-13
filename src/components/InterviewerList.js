import React from 'react';
import PropTypes from 'prop-types'; 

import 'components/InterviewerList.scss';

import InterviewerListItem from './InterviewerListItem';

const InterviewerList = (props) => {

  const interviewersData = props.interviewers;
  const listInterviewers = interviewersData.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listInterviewers}</ul>
    </section>
  );
};

InterviewerList.propTypes = { //The prop interviewers needs to be an array.
  interviewers: PropTypes.array.isRequired
};

 
export default InterviewerList;