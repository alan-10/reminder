import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import converterDates from '../../utils/converterDates';
import converterHourInMinutes from '../../utils/converterHoursInMinutes';

import './styles.css';

toast.configure();
const CreateTask: React.FC = () => {

   const dateNow = new Date().toLocaleDateString();
  

  const history = useHistory();

  const [yarTask, setYarTask] = useState(converterDates(dateNow));
  const [hourTask, setHourTask] = useState('');
  const [description, setDescription] = useState('')
  


  const  erroToShedule = () => {
    toast.error('Horário já utilizado.', {
      position: toast.POSITION.TOP_CENTER
    })
  }

  function handleCreateTask(e: FormEvent) {
    e.preventDefault();

    api.post('/task', {
      yarTask,
      hourTask,
      description,
      isCheked: false,
      hourInMinutes: converterHourInMinutes(hourTask)
    }).then(() => {
      history.push('/page-main');
    }).catch(() => {
      erroToShedule();
    })

  }

  return (
    <div className="container" id="create-task">


      <PageHeader redirect="/page-main" />
     
      <form onSubmit={handleCreateTask} id="form-create-task">
    
      <div id="dates">
        <div className="input-block">
          <label htmlFor="dataCreate"> <strong>Data</strong></label>
          <input
            type="date" name=""
            id="dataCreate"
            required
            value={yarTask}
            onChange={e => setYarTask(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="create-hour"> <strong>Hora</strong> </label>
          <input
            type="time" name=""
            id="create-hour"
            required
            value={hourTask}
            onChange={e => setHourTask(e.target.value)}
          />
        </div>
        </div>

        <div className="textarea-block">
          <label htmlFor="create-hour"> <strong>Descrição</strong> </label>
          <textarea
            name="" id="create" required
            value={description}
            onChange={e => setDescription(e.target.value)}
          >

          </textarea>
        </div>

        <button type="submit">
          <strong>Agendar tarefa</strong>
           </button>

      </form>
    
    </div>


  )
}

export default CreateTask;