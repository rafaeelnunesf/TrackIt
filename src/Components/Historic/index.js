import Top from "../Top/"
import Menu from "../Menu/"
import {Container, MyHistoric} from './styles'
export default function Historic() {
    return(
        <Container>
            <Top/>
                <MyHistoric>
                    <p>Histórico</p>
                </MyHistoric>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            <Menu/>
        </Container>
    )
}
