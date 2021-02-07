import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';


toast.configure()
function PageForgotPassword() {
    const history = useHistory()
    const [email, setEmail] = useState('');


    const erroForgot = () => {
        toast.error('Email inválido.', {
            position: toast.POSITION.TOP_CENTER
        });
    }

    const emailSend = () => {
        toast.success('Email de recuperação de senha enviado, verifique no seu email.', {
            position: toast.POSITION.TOP_CENTER
        });
    }

    function handdleForgotPassword(e: FormEvent) {
        e.preventDefault();

        api.put('/forgot-password', { email }).then(() => {
            emailSend();
            history.push('/');
        }).catch(() => {
            erroForgot();
        })

    }

    return (
        <div className="container" id="forgot-password">
            <PageHeader redirect="/" />
            <div className="forgot-content">

                <h2>Aqui você pode obeter facilmente uma nova senha!</h2>
                <form onSubmit={handdleForgotPassword} id="form-forgot">
                    <div className="input-block">
                        <input
                            placeholder="Email"
                            type="email"
                            name="" id=""
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <button type="submit">Recuperar senha</button>
                </form>
            </div>

        </div>
    );
}

export default PageForgotPassword;