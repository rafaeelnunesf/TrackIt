import styled from "styled-components"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router"



export default function Register() {
    let navigate = useNavigate()
    return(
        <Container>
                <img src={logo} alt="logo"/>
                <form>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="senha"/>
                    <input type="text" placeholder="nome"/>
                    <input id='files' type="url" placeholder="imagem"/>
                    <button>Cadastrar</button>
                </form>
                <h1 onClick={()=>navigate('/')}>Não tem uma conta? Cadastre-se!</h1>
        </Container>
    )
}

const Container = styled.div`
    width: 375px;
    height: 100vh;

    box-sizing:border-box;
    padding: 68px 36px 0 36px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;

    margin: 0 auto;

    background: #FFFFFF;
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px
    }
    form input{
        width: 303px;
        height: 45px;

        border: 1px solid #D5D5D5;

        box-sizing: border-box;
        padding:10px;

        border-radius: 5px;
        font-family: Lexend Deca;

        font-size: 19.976px;
        line-height: 25px;
        
        outline:none;
        ::placeholder{
            color: #DBDBDB;
        }
    }
    form button{
        width: 303px;
        height: 45px;
        
        border-radius: 4px;
        border:none;
        
        font-family: Lexend Deca;
        font-size: 20.976px;
        line-height: 26px;
        
        background: #52B6FF;
        color: #FFFFFF;
    }
    h1{
        width: 232px;
        height: 17px;

        font-family: Lexend Deca;
        font-size: 13.976px;
        line-height: 17px;

        text-decoration-line: underline;

        color: #52B6FF;
        :hover{
            cursor: pointer;
        }
    }
`