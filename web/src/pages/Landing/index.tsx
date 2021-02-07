import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
  

import { AuthContext } from '../../Context/AuthContext';

import logoImg from '../../assets/images/logo.svg';
import { FaCalendarCheck } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';

import './styles.css';
import { stringify } from 'querystring';


toast.configure();
function Landing() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { authenticated,
     addStatusAuthenticated ,
     whilleLoading,
    
    } = useContext(AuthContext);

   


  //show erro to client
  const  notify =  () => {
    toast.error( 'Email ou senha inválida.',{
      position: toast.POSITION.TOP_CENTER
    })
  }


  function handleVerifyUser(e: FormEvent) {
    e.preventDefault();
    api.post('/auth', { email, password }).then(response => {
      const { data: { token } } = response;

      localStorage.setItem('token', JSON.stringify(token));
      api.defaults.headers.Authorization = `Bearer ${token}`
      addStatusAuthenticated(true);
      history.push('/page-main');
    }).catch(() =>  {
       notify();
      
    });


  }

  

  return (
    <div id="page-landing" >
      <div id="page-landing-content" className="container">
        <div className="title-login">
          <h1 className="textLogin">Reminder</h1>
          <FaCalendarCheck color='#ccc' size="5rem" />
        </div>
        <div className="logo-container">

          <img
            src={logoImg}
            alt="Logo"
            className="hero-image"
          />
        </div>

        <form onSubmit={handleVerifyUser} id="form-login">
          <div className="input-block">
            <label htmlFor="user"> <FiUser /> Usuário </label>
            <input type="text"
              name=""
              id="user"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="password"><FiLock /> Senha  </label>
            <input type="password"
              name="" id="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <Link to="/forgot-passwod">Esqueci minha senha</Link>
          <div className="submit-login">
            <button

              type="submit">Entrar</button>
          </div>

                   Não tem uma conta?<Link to="/createUser"> Registri-se</Link>

        </form>

      </div>
    </div>
  )
}

export default Landing;