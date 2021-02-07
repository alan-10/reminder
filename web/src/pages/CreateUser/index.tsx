import React, { useState, FormEvent } from 'react';
import { Link, useHistory} from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';

import { BsArrowLeft } from 'react-icons/bs';

import { FiLock } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { FiMail } from 'react-icons/fi'

import './styles.css';


toast.configure();
function CreateUser() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(false);

    const verify = () => {
        toast.error('Usuário já registrado.',{
            position: toast.POSITION.TOP_CENTER
        });
        
    }


     function handleCreateUser(e: FormEvent) {
        e.preventDefault();
        
        
              api.post('/users', {
                name,
                email,   
                password
            }).then(() => {
                history.push('/created-user');
                
            }).catch(() => {
                verify();
               
            })
    }

    if(user ){
        return <h1>la la la</h1>
    }

    return (
        <div id="page-create-user">

            <div id="page-create-user-content" className="container" >

                < PageHeader redirect="/" />
                {/* <strong>Aqui você pode agendar diversas tarefas e manter-se organizado de forma prática e simples</strong> */}
                <div className="user-create-content">

                    <h2 className="text-create-user">
                        Cadastre-se e honre seus compromissos de forma divertida!
                    </h2>

                    <div className="form-create-user">
                        <form onSubmit={handleCreateUser} id="form-create-user-content">
                            <div className="input-block">
                                <label htmlFor="email"><FiMail /> E-mail</label>
                                <input type="email" name=""
                                    id="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="input-block">
                                <label htmlFor="name"><FiUser /> Usuário</label>
                                <input type="text"
                                    name="" id="name"
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>

                            <div className="input-block">
                                <label htmlFor="password"><FiLock /> Senha</label>
                                <input
                                    type="password" name=""
                                    id="password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>



                            <div className="submit-button">
                                <button type="submit">Cadastrar</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateUser;