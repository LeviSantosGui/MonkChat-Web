import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #583bbf;
  color: #ffffff;
  padding: 2em 5em 6em 5em;

  font-family: Montserrat;
  min-height: 100vh;
  min-width: 1200px;
`;

const ContainerElementos = styled.div`
  display: flex;
  flex-direction: row;
  background: rgba(0, 0, 0, 0.12);

  padding: 3em 5em;
  
.formulario {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 2em;
}

.box-sala {
  display: flex;
  flex-direction: column;
}

.box-sala > div {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  margin: 0.2em;
}

.label {
  font-weight: 700;
  font-size: 1.2em;
  width: 4em;
}

.box-mensagem {
  display: flex;
  flex-direction: column;
}

.botao-enviar {
  align-self: flex-end;
}

.container-chat {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  padding: 0em 2em 2em 2em;
  height: 28em;
}

.icone-atualizar {
  width: 1em;
  align-self: flex-end;
  margin: 0.4em;

  cursor: pointer;
}

.icone-atualizar:hover {
  transform: rotate(360deg);
  transition: 0.5s;
}

.chat {
  display: flex;
  flex-direction: column;
  background: rgba(192, 65, 224, 0.19);
  border-radius: 3px;

  padding: 1.5em;
  height: 100%;

  overflow-y: auto;
}

.chat::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #3e006f;
}

.chat::-webkit-scrollbar {
  width: 7px;
  background-color: #3e006f;
  border-radius: 10px;
}

.chat::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #cbcbcb;
}

.chat-mensagem {
  display: flex;
  flex-direction: row;

  font-size: 0.9em;
  margin: 0.4em 0.2em;
}

.chat-mensagem > div {
  margin: 0em 0.2em;
}

@media (max-width: 400px) {
    flex-direction: column;
    padding: 0.2em;

  .formulario {
    padding: 1em;
    justify-content: flex-start;
  }

  .formulario > div {
    margin-bottom: 2em;
  }

  .box-sala > div {
    justify-content: flex-start;
  }

  .box-sala > div:nth-of-type(3) {
    flex-direction: column;
  }

  .chat {
    overflow-y: unset;
    height: auto;
  }

  .container-chat {
    height: auto;
    padding: 1em;
  }

  .chat-mensagem {
    flex-direction: column;
    margin: 1em 0em;
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
    border-radius: 0.3em;

    height: 2.5em;
    margin: 0.3em 0em;
  }

  .label {
    width: 4em;
  }
}
`;

export { Container, ContainerElementos };