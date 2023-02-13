import { ContainerElementos } from './elementos.styled.js';
import { ChatButton, ChatInput, ChatTextArea } from '../../Components/Inputs/inputs.js';

import { useState, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

import Api from '../../Service/api.js';
const api = new Api();

function lerUsuarioLogado(navigation) {
    let logado = Cookies.get('usuario-logado');
    if (logado == null)
        navigation.push('/');

    let usuarioLogado = JSON.parse(logado);
    return usuarioLogado;
};

export default function Elementos() {
    const navigation = useHistory();
    let usuarioLogado = lerUsuarioLogado(navigation);

    const [chat, setChat] = useState([]);
    const [sala, setSala] = useState('');
    const [usua, setUsua] = useState(usuarioLogado.nm_usuario);
    const [msg, setMsg] = useState('');

    const loading = useRef(null);

    const validarResposta = (resp) => {

        if (!resp.erro)
            return true;
        toast.error(`${resp.erro}`);
        return false;
    };

    const carregarMensagens = async () => {
        loading.current.continuousStart();

        const mensagens = await api.listarMensagens(sala);
        if (validarResposta(mensagens))
            setChat(mensagens);

        loading.current.complete();
    };

    const enviarMensagem = async () => {
        if (event.type === 'keypress' && (!event.ctrlKey || event.charCode !== 13))
            return;

        const resp = await api.inserirMensagem(sala, usua, msg);
        if (!validarResposta(resp))
            return;

        toast.dark('Mensagem Enviada com Sucesso!');
        await carregarMensagens();
    };

    const inserirUsuario = async () => {
        const resp = await api.inserirUsuario(usua);
        if (!validarResposta(resp)) 
            return;
        
        toast.dark('Usuário Cadastrado!');
        await carregarMensagens();
    };

    const inserirSala = async () => {
        const resp = await api.inserirSala(sala);
        if (!validarResposta(resp)) 
            return;
        
        toast.dark('Sala Cadastrada!');
        await carregarMensagens();
    };

    return (
        <ContainerElementos>
          <LoadingBar color='#F3D991' ref={loading} />
          <ToastContainer />
          <div className="formulario">
            <div className="box-sala">
              <div>
                <div className="label">Sala:</div>
                <ChatInput value={sala} onChange={e => setSala(e.target.value)} />
              </div>
              <div>
                <div className="label">Nick:</div>
                <ChatInput value={usua} readOnly={true} />
              </div>
              <div>
                <ChatButton onClick={inserirSala}>Criar</ChatButton>
                <ChatButton onClick={inserirUsuario}>Entrar</ChatButton>
              </div>
            </div>
            <div className="box-mensagem">
              <div className="label">Mensagem:</div>
              <ChatTextArea value={msg} onChange={e => setMsg(e.target.value)} onKeyPress={enviarMensagem} />
              <ChatButton onClick={enviarMensagem} className="botao-enviar">Enviar</ChatButton>
            </div>
          </div>
          <div className="container-chat">
            <img onClick={carregarMensagens} className="icone-atualizar" src="/Assets/Images/ícone-Atualização.png" alt="" />
            <div className="chat">
                {chat.map(x =>
                    <div>
                      <div className="chat-mensagem">
                          <div>({new Date(x.dt_mensagem.replace('Z', '')).toLocaleTimeString()})</div>
                          <div><b>{x.tb_usuario.nm_usuario}</b> fala para <b>Todos</b>:</div>
                          <div> {x.ds_mensagem} </div>
                      </div>
                    </div>
                )};
            </div>
        </div>
        </ContainerElementos>
    );
};