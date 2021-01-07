import React, { FormEvent, useState, useContext, useEffect } from 'react';

import { AuthContext } from '../../Context/AuthContext';
import { BeatLoader } from 'react-spinners';
import Header from '../../components/PageHeader'
import Tasks, { Task } from '../../components/Tasks';
import NotTasks from '../../components/NotTasks';
import api from '../../services/api';

import './styles.css';


const SeachTask: React.FC = () => {

  const { taskChanged ,taskChangUpdate } = useContext(AuthContext);

  const [dateTask, setDateTask] = useState('');
  const [task, setTask] = useState([]);

  const [yarTask, setYarTask] = useState(false);
  const [showDate, setShowDate]= useState('')


  async function changeClick(){
    setYarTask(!yarTask);
    setShowDate(dateTask);
  }

 useEffect(() => {
  if(dateTask === ''){
         return console.log('erro data incvalida')
       }
  
    api.post(`/task-index?yarTask=${dateTask}`).then(result => {   
         setTask(result.data);
       })
       .catch(() => {
         setTask([]);
       })
 }, [yarTask,taskChanged,dateTask ]);


  
  // function handleListTasks (e: FormEvent){
  //   e.preventDefault();

  //   if(dateTask === ''){
  //     return console.log('erro data incvalida')
  //   }

  //   api.post(`/task-index?yarTask=${dateTask}`).then(result => {   
  //     setTask(result.data);
  //   })
    

  // }

  if(taskChanged == true){
    return <BeatLoader />
  }

  return (
    <div className="container" id="seach-page">
      <Header redirect="/page-main" />

      <div className="header">
        { showDate }
          <input
            type="date" name=""
            id="dateSeach"
            value={dateTask}
            onChange={e => setDateTask(e.target.value)}
          />
          {/* <button onClick={changeClick} id="buttonSeach">
            <strong>Pesquisar</strong>
          </button> */}
          
      </div>

      <div id="tasks">
      {(task.length ==  0  )?(
           ''
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

  );
}
export default SeachTask;