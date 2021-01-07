import React, { useState, useContext } from 'react';
import { FcAlarmClock } from 'react-icons/fc';
import { MdDeleteForever } from 'react-icons/md';

import { AuthContext } from '../../Context/AuthContext';

import api from '../../services/api';

import './styles.css';

export interface Task {
  id: number;
  description: string;
  hourTask: string
  isCheked: string;
}

interface TasksProps {
  task: Task;
}



const Tasks: React.FC<TasksProps> = ({ task }) => {
  const { taskChangUpdate } = useContext(AuthContext);
  


  async function updateCheked(id: number, isCheked: boolean) {
   
    taskChangUpdate(true);
    const resultChek  =  !isCheked ;

    const resusts = await api.put(`/update-task/${id}?isCheked=${resultChek}`)

    taskChangUpdate(false);

  }


  return (
    <div id="content-task" className="content-task">
      <strong> {task.hourTask} <FcAlarmClock /></strong>
      <p>{task.description}</p> <br />
      <label >

        <input type="checkbox" name=""
          id="input-check" checked={task.isCheked ==  '1' ? true : false}
          onChange={() => updateCheked(task.id, task.isCheked ? true : false)}
        />
        <span id="checked"> </span>
      </label>

      <a href="#"> <MdDeleteForever size="3.5rem" /></a>
    </div>
  );
}

export default Tasks;