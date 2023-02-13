import { Container } from './styled';
import { ChatButton, ChatInput } from '../../Components/Inputs/inputs.js';

import { useState, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

import Api from '../../Service/api.js';
const api = new Api();

export default function Login() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const navig = useHistory();
    const loading = useRef(null);

    const logar = async () => {
        loading.current.continuousStart();
        
        let resp = await api.login(login, senha);
        if (resp.erro) {
            toast.error(`${resp.erro}`);
            loading.current.complete();
        } else {
            Cookies.set('usuario-logado', JSON.stringify(resp));
            navig.push('/chat');
        }
    };

    return (
        <Container>
            <LoadingBar color='#F3D991' ref={loading} />
            <ToastContainer />
            <div className="box-login">
                <div className="titulo">
                    <img src="/Assets/Images/MonkChatWeb-Logo.png" />
                    <br /> MonkChat
                </div>
            </div>
            <div className="login">
                <div className="container-formulario">
                    <div className="formulario-row">
                        <div className="titulo-login">Faça seu Login</div>
                    </div>
                    <div className="container-formulario">
                        <div>
                            <div className="label">Login</div>
                            <ChatInput
                                style={{ border: '1px solid gray', fontSize: '1.5em' }}
                                value={login}
                                onChange={e => setLogin(e.target.value)} />
                        </div>
                        <div>
                        <div className="label">Senha</div>
                            <ChatInput
                                type="password"
                                style={{ border: '1px solid gray', fontSize: '1.5em' }}
                                value={senha}
                                onChange={e => setSenha(e.target.value)} />
                        </div>
                        <div>
                            <ChatButton
                                 onClick={logar}
                                 style={{ fontSize: '1.2em' }}>Login</ChatButton>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};