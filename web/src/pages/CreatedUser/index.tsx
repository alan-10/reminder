import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'

const CreatedUser: React.FC = () => {
  return (
    <div id="user-is-create">
      <div className="class-container" id="is-create">

        <div className="message-create">
          <h1> Cadastrado com successo!</h1> 
          <p>Seja bem vindo! <br/> Faça o login e comece  agendar suas tarefas.</p>
        </div>

        <div id="button-to-landing">
          <Link to="/" >Fazer login </Link>
        </div>
      </div>
    </div>

  );
}


export default CreatedUser;