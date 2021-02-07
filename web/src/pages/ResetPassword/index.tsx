import React, { useEffect, FormEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

function ResetPassword(){

  const [password,setPassword] = useState('');

  const location = useLocation();
  const token = location.search.replace('?token=', '');
   

  

  function handdleSubmtReset(e: FormEvent){
    e.preventDefault();
    api.put('/reset-password', {
      password:password,
        token:token  as string
      })
  }

  return (
    <div className="container" id="reset-password">
      <div className="form-reset">
        <h3>Resetar senha</h3>
        <form onSubmit={handdleSubmtReset}>
          <div className="input-block">
            <input type="password"
             name="" id="" required minLength={5}
             placeholder="Sua nova senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
             />
          </div>

          <button>Alterar senha.</button>
        </form>
      </div>
    </div>
  )
};

export default ResetPassword;