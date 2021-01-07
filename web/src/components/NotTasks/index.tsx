import React from 'react';


import notTask from '../../assets/images/notTask.svg';

import './styles.css';


const NotTasks = () => {
  return (
    <div id="notTask" className="notTask">
      <h4>Não há tarefas <br/> agendada nesta data.</h4>
      <img src={notTask} alt="" id="image-notTask" className="image-notTask"/>
    </div>
  );
}

export default NotTasks;