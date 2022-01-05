import styled from "styled-components"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router"
import { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";



export default function Login() {
    const [formData, setFormData] = useState({email:'',password:''})
    const [loading, setLoading] = useState(false)

    let navigate = useNavigate();

    function handleLogin() {
        const promiseLogin = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login',formData)
        setLoading(true)
        promiseLogin.then(answer=>{
            setLoading(false)
        })
        promiseLogin.catch(error => {
            setLoading(false)
            alert(error.response.data.message)
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)
        handleLogin()
        // navigate('/habits')
    }
    return(
        <>
            <Container>
                <img src={logo} alt="logo"/>
                <form onSubmit={handleSubmit}>
                    <input required type="email" placeholder="email" value={formData.email}onChange={e=>setFormData({...formData,email:e.target.value})}/>
                    <input required type="password" placeholder="senha" value={formData.password}onChange={e=>setFormData({...formData,password:e.target.value})}/>
                    <button type='submit'>
                        {loading?'':'Entrar'}
                        <Loader type="Bars" color="#FAFAFA" height={25} width={25} visible={loading}/>
                    </button>
                </form>
                <h1 onClick={()=>navigate('/register')}>Não tem uma conta? Cadastre-se!</h1>
            </Container>
        </>
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