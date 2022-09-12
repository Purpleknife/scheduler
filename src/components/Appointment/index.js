import React from 'react';

import './styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

import useVisualMode from 'hooks/useVisualMode';

const Appointment = (props) => {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  const save = (name, interviewer) => {

    transition(SAVING); //To handle longer requests.

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview);
    
    transition(SHOW);
  };


  const cancel = () => {
    transition(DELETING);

    props.cancelInterview(props.id);

    transition(EMPTY);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form 
          onCancel={() => back()}
          onSave={save}
          interviewers={props.interviewers}
        />
      )}
      {mode === SAVING && <Status message={'Saving...'}/>}
      {mode === DELETING && <Status message={'Deleting...'}/>}
      {mode === CONFIRM && (
        <Confirm 
          onCancel={() => back()}
          onConfirm={cancel}
          message='Are you sure you would like to delete?'
        />
      )}
    </article>
  );
};
 
export default Appointment;