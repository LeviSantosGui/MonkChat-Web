import { Container } from './styled.js';

import Cabecalho from '../../Components/Cabecalho';
import Elementos from './elementos.js';

export default function MonkChat() {
    return (
        <Container>
            <Cabecalho />
            <Elementos />
        </Container>
    )
}