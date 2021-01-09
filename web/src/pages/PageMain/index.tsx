import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import { FiSearch } from 'react-icons/fi'
import { IoMdCheckmark } from 'react-icons/io';
import { IoIosPower } from 'react-icons/io';


import { AuthContext } from '../../Context/AuthContext';

import api from '../../services/api';
import converterDates from '../../utils/converterDates';

import Tasks, { Task } from '../../components/Tasks';
import Modal from '../../components/Modal';
import NotTasks from '../../components/NotTasks';



import "./styles.css";




function PageMain() {

  const history = useHistory();
  const {
    addStatusAuthenticated,
    taskChanged,
    isModalVisible
  } = useContext(AuthContext);


  const [task, setTask] = useState([]);


  //sair da aplicação
  function handleLogout() {
    addStatusAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/');
  }


  const dateNow = new Date().toLocaleDateString();
  const yarTask = converterDates(dateNow);

  useEffect(() => {

    api.post(`/task-index?yarTask=${yarTask}`).then(results => {
      const data = results.data;
      setTask(data);
    })
      .catch(() => setTask([]));

  }, [taskChanged]);

  if (taskChanged == true) {
    return <BeatLoader />
  }

  return (
    <div className="container" id="page-main">

      <header id="header-main">
        <div id="seach-main">
          <FiSearch size="20px" /> &nbsp;
          <Link to="/seach-tasks"> Pesquisar</Link>


        </div>
        <Link to="#" onClick={handleLogout} >< IoIosPower color="red" size="3rem" /></Link>
      </header>

      <div className="body-main" id="body-main">
        <div id="header-two" className="header-two">

          <div>{dateNow}</div>
          <Link to="/create-task"> <strong>+Novo lembrete</strong></Link>
        </div>




        <div id="tasks">

          {(task.length === 0 || task[0] === undefined) ? (
            < NotTasks />
          )
            :
            (task.map((taskItem: Task) => {
              return (
                <Tasks key={taskItem.id} task={taskItem} />
              );
            })
            )
          }

        </div>
      </div>
      {isModalVisible ? <Modal /> : null}
    </div>
  )
}

export default PageMain;