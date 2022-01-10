import logo from "../../assets/logo.png"

import { useNavigate } from "react-router"
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

import UserContext from '../../Contexts/UserContext'
import {Container, Button, Input} from './styles'

export default function Login() {
    const {setUserData, setAndPersistUserData} = useContext(UserContext)
    const [formData, setFormData] = useState({email:'',password:''})
    const [loading, setLoading] = useState(false)

    let navigate = useNavigate();

    useEffect(()=>{
        const serializedUserData = JSON.parse(localStorage.getItem('UserData'))
        if(serializedUserData!==null){
            const promiseLogin = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login',{email:serializedUserData.email,password:serializedUserData.password})
            promiseLogin.then(answer=>{
                setUserData(answer.data)
                navigate('/today')
            })
        }
    },[])
    
    function handleSubmit(e) {
        setLoading(true)
        e.preventDefault()
        const promiseLogin = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login',formData)
        promiseLogin.then(answer=>{
            setLoading(false)
            setUserData({image:answer.data.image,token:answer.data.token})
            setAndPersistUserData(answer.data)

            navigate('/today')
        })
        promiseLogin.catch(error => {
            error.response.data.details === undefined 
            ? 
            alert(error.response.data.message)
            :
            alert(error.response.data.details);
            setLoading(false)
        })
    }
    
    return(
        <>
            <Container>
                <img src={logo} alt="logo"/>
                <form onSubmit={handleSubmit}>
                    <Input required disabled={loading} type="email" placeholder="email" value={formData.email}onChange={e=>setFormData({...formData,email:e.target.value})}/>
                    <Input required disabled={loading} type="password" placeholder="senha" value={formData.password}onChange={e=>setFormData({...formData,password:e.target.value})}/>
                    <Button disabled={loading} type='submit'>
                        {loading?'':'Entrar'}
                        <Loader type="ThreeDots" color="#FAFAFA" height={43} width={55} visible={loading}/>
                    </Button>
                </form>
                <h1 onClick={()=>navigate('/register')}>Não tem uma conta? Cadastre-se!</h1>
            </Container>
        </>
    )
}