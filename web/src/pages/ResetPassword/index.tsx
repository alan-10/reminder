import React, { useEffect, FormEvent, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import './styles.css';


toast.configure();
function ResetPassword(){
  const history = useHistory();
  const [password,setPassword] = useState('');

  const location = useLocation();
  const token = location.search.replace('?token=', '');
   

  

  function handdleSubmtReset(e: FormEvent){
    

    const errroUpdatePasswors = () => {
      toast.error('Erro gere um novo link', {
        position: toast.POSITION.TOP_CENTER
      });
    }

    const successUpdatePassword = () => {
      toast.success('Senha alterada, faça o login', {
        position: toast.POSITION.TOP_CENTER
      });
    }

    e.preventDefault();
    api.put('/reset-password', {
      password:password,
        token:token  as string
      }).then(() => {

      }).catch(() => {
        errroUpdatePasswors();
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