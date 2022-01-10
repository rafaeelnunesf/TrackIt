import plus from "../../assets/+.png"
import trash from "../../assets/delete.png"

import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Loader from "react-loader-spinner";
import {Container, MyHabits, Button, Message, CreateHabit, Input, Day, FooterButtons, SubmitButton, HabitsList, Habit, Delete} from './styles'
import axios from "axios"
import PercentageDoneContext from "../../Contexts/PercentageDoneContext"
import UserContext from '../../Contexts/UserContext'

import Top from "../Top/"
import Menu from "../Menu/"

export default function Habits() {
    const [habits, setHabits] = useState([])
    const [habitCriationEnabled, setHabitCriationEnabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [habitName, setHabitName] = useState('')
    const [habitDays, setHabitDays] = useState([])
    const [todayHabits, setTodayHabits] = useState([])
    const { setPercentageDone} = useContext(PercentageDoneContext)

    const {userData} = useContext(UserContext)

    let navigate = useNavigate()

    const weekDays = [{indexDay:0,nameDay:'D'},
    {indexDay:1,nameDay:'S'},
    {indexDay:2,nameDay:'T'},
    {indexDay:3,nameDay:'Q'},
    {indexDay:4,nameDay:'Q'},
    {indexDay:5,nameDay:'S'},
    {indexDay:6,nameDay:'S'}]

    function getHabits() {
        if(userData===null){
            navigate('/')
            return
        }
        const config = {
            headers: {
                "Authorization": `Bearer ${userData.token}`
            }
        }
        const promiseHabits = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',config)
        promiseHabits.then(answer=>{
            setHabits(answer.data)
        })
    }
    function getTodayHabits() {
        if(userData===null){
            navigate('/')
            return
        }
        const config = {
            headers: {
                "Authorization": `Bearer ${userData.token}`
            }
        }
        const promiseHabits = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',config)
        promiseHabits.then(answer=>{
            setTodayHabits(answer.data)
        })
    }
    let countHabitsDone = 0
    todayHabits.forEach(habit => habit.done === true && countHabitsDone++)
    if(todayHabits.length!==0)
        setPercentageDone((countHabitsDone / todayHabits.length)*100)

    useEffect(getTodayHabits,[])

    useEffect(getHabits,[])

    function addDay(day) {
        if(habitDays.includes(day)){
            habitDays.splice(habitDays.indexOf(day),1)
            setHabitDays([...habitDays])
        }else{
            setHabitDays([...habitDays,day])
        }
    }
    function handleSubmit(e) {
        setLoading(true)
        e.preventDefault()
        const body = {
            name:habitName,
            days:habitDays
        }
        const config = {
            headers: {
                "Authorization": `Bearer ${userData.token}`
            }
        }
        if(habitDays.length===0){
            alert('Escolha pelo menos um dia da semana')
            setLoading(false)
            return
        }
        if(habitName===''){
            alert('O campo de nome não pode estar vazio')
            setLoading(false)
            return
        }
        const promisePostHabits = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',body,config)
        promisePostHabits.then(answer=>{
            setLoading(false)
            setHabits([...habits,answer.data])
            setHabitCriationEnabled(false)
            setHabitDays([])
            setHabitName('')
            const promiseHabits = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',config)
            promiseHabits.then(answer=>{
                setTodayHabits(answer.data)
            })
        })
        promisePostHabits.catch(error=>{
            alert(error.response.data.details);
            setLoading(false)
        })
    }

    function deleteHabit(id) {

        if (window.confirm("Você deseja apagar o hábito?")){
            const config = {
                headers: {
                    "Authorization": `Bearer ${userData.token}`
                }
            }
            const promiseDeleteHabits = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,config)
            promiseDeleteHabits.then(answer=>{
                // console.log(answer.data)
                let habits = answer.data
                setHabits(habits)
                setHabitCriationEnabled(false)
                getHabits()
                const promiseHabits = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',config)
                promiseHabits.then(answer=>{
                    setTodayHabits(answer.data)
                })
            })
        }
    }
    return(
        <Container>
            <Top/>
            <MyHabits> 
                <p>Meus hábitos</p>
                <Button image={plus} onClick={()=>setHabitCriationEnabled(true)}></Button>
            </MyHabits>
            {habitCriationEnabled&&
            <CreateHabit onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <Input disabled={loading} placeholder='nome do habito' value={habitName} onChange={(e)=>setHabitName(e.target.value)}></Input>
                    <div>
                        {weekDays.map(({indexDay,nameDay})=>(
                            <Day type='button' onClick={()=>addDay(indexDay)} disabled={loading} wasClicked={habitDays.includes(indexDay)?true:false}>{nameDay}</Day>
                        ))}
                    </div>
                </div>
                <FooterButtons>
                    <SubmitButton disabled={loading} type='button'onClick={()=>setHabitCriationEnabled(false)}>Cancelar</SubmitButton>
                    <SubmitButton disabled={loading} type='submit'>
                        {loading?'':'Salvar'}
                        <Loader type="ThreeDots" color="#FAFAFA" height={35} width={43} visible={loading}/>
                    </SubmitButton>
                </FooterButtons>
            </CreateHabit>}
            {habits.length === 0?
            <Message>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Message>
            : 
            <HabitsList>
                {habits.map(({id,name,days})=>(
                    <Habit>
                        <p>{name}</p>
                        <div>
                            {weekDays.map(({indexDay,nameDay})=>(
                                <Day wasClicked={days.includes(indexDay)?true:false}>{nameDay}</Day>
                            ))}
                        </div>
                        <Delete image={trash} onClick={()=>deleteHabit(id)}/>
                    </Habit>
                ))}
            </HabitsList>}
            
            <Menu/>
        </Container>
    )
}