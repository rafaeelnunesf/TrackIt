import styled from "styled-components"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router"
import Top from "./Top"
import Menu from "./Menu"



export default function Historic() {
    return(
        <Container>
            <Top/>
            <Menu/>
        </Container>
    )
}
const Container = styled.div`
    width: 375px;
    height: 100vh;
    
    box-sizing:border-box;
    padding: 0px 17px 0 17px;

    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    
    background: #F2F2F2;
`