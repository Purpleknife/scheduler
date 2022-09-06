import React from 'react'; //Optional since we have a newer version of React (above v17).

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
        selected={interviewer.id === props.interviewer}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listInterviewers}</ul>
    </section>
  );
}
 
export default InterviewerList;