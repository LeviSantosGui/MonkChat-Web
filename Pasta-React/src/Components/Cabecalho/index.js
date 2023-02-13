import { Icone, ContainerCabecalho } from './styled.js';

export default function Cabecalho() {
  return (
    <ContainerCabecalho>
      <img src="/Assets/Images/MonkChatWeb-Logo.png"/>
      <Icone />
      <div className="titulo">MonkChatWeb</div>
    </ContainerCabecalho>
  );
}