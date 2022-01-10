import check from "../../assets/check.png"

import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import dayjs from "dayjs";
import 'dayjs/locale/es'

import UserContext from '../../Contexts/UserContext'
import PercentageDoneContext from "../../Contexts/PercentageDoneContext";
import {Container, Day, DayProgrss, Habits, Habit, Done, Sequence} from './styles'

import Top from "../Top/";
import Menu from "../Menu/";

export default function Today() {
    const {userData} = useContext(UserContext)
    const { percentageDone ,setPercentageDone} = useContext(PercentageDoneContext)
    const [todayHabits, setTodayHabits] = useState([])
    let navigate = useNavigate()
    
    
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
    
    useEffect(getTodayHabits,[])
    
    function markAsDone(id) {
        const config = {
            headers: {
                "Authorization": `Bearer ${userData.token}`
            }
        }
        todayHabits.forEach((habit,i)=>{
            if (habit.id === id && habit.done === false){
                const promiseCheck = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,'',config)
                promiseCheck.then(getTodayHabits)
                promiseCheck.catch((error)=>console.log(error.response.data))
            }else if(habit.id === id && habit.done === true){
                const promiseUncheck = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,'',config)
                promiseUncheck.then(getTodayHabits)
                promiseUncheck.catch((error)=>console.log(error.response.data))
            }
        })
    }
    
    let countHabitsDone = 0
    todayHabits.forEach(habit => habit.done === true && countHabitsDone++)
    if(todayHabits.length!==0)
        setPercentageDone((countHabitsDone / todayHabits.length)*100)

    return(
        <Container>
            <Top/>
            <Day>
                <h1>{`${dayjs().format('dddd, DD/MM')}`}</h1>
                {(percentageDone===0 || percentageDone===isNaN)?
                <DayProgrss hasColor={false}>Nenhum hábito concluído ainda</DayProgrss>
                :
                <DayProgrss hasColor={true}>{`${percentageDone.toFixed(0)}% do hábitos concluídos`}</DayProgrss>}
            </Day>
            <Habits>
                {todayHabits.map(({id,name,done,currentSequence,highestSequence})=>(
                    <Habit>
                        <p>{name}</p>
                        <div>
                            <Sequence hasColor={done } >Sequência atual: <strong>{`${currentSequence} dias`}</strong></Sequence>
                            <br/>
                            <Sequence hasColor={done && currentSequence===highestSequence} >Seu recorde: <strong>{`${highestSequence} dias`}</strong></Sequence>
                        </div>
                        <Done done={done} image={check} onClick={()=>markAsDone(id)}/>
                    </Habit>
                ))}
            </Habits>
            <Menu/>
        </Container>
    )
}