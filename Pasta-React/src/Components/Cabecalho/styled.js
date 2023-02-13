import styled from "styled-components";

const Icone = styled.div`
  background: linear-gradient(180deg, #ba9d4c -10.17%, #f3d991 115.25%);
  width: 4px;
  height: 3em;
  margin: 0em 1em;
  border-radius: 1em;
`;

const ContainerCabecalho = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  margin-bottom: 3em;

.titulo {
  font: 700 2.2em Montserrat;
}

@media (max-width: 400px) {
  flex-direction: column;
}
`;

export { Icone, ContainerCabecalho };