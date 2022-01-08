import styled from "styled-components"

import check from "../assets/check.png"

import { useContext } from "react";
import UserContext from '../Contexts/UserContext'
import PercentageDoneContext from "../Contexts/PercentageDoneContext";


import 'dayjs/locale/es'
import dayjs from "dayjs";

import Top from "./Top";
import Menu from "./Menu";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";
import { useNavigate } from "react-router";

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
const Day = styled.div`
    height:105px;
    width:100%;

    box-sizing:border-box;
    padding: 28px 0px;
    h1{
        font-family: Lexend Deca;
        font-size: 22.976px;
        line-height: 29px;

        color: #126BA5;
    }
`
const DayProgrss = styled.h2`
    font-family: Lexend Deca;
    font-size: 17.976px;
    line-height: 22px;

    color: ${({hasColor}) => hasColor?'#8FC549':'#BABABA'};
`
const Habits = styled.div`
    width: 340px;
    max-height:65vh;
    overflow:scroll;
    display: flex;
    flex-direction: column;
    gap:10px;
    `
const Habit = styled.div`
    width: 100%;
    min-height: 95px;

    background: #FFFFFF;
    border-radius: 5px;

    box-sizing:border-box;
    padding: 12.5px 13px 12.5px 15px;
    p{
        font-family: Lexend Deca;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }
    position:relative;
    display:flex;
    flex-direction:column;

    gap:7px;
`
const Done = styled.div`
    width: 70px;
    height: 70px;

    position:absolute;
    right: 13px;
    top: 12.5px;


    background-color: ${({done}) => done?'#8FC549':'#EBEBEB'};
    border-radius: 5px;

    background-image: url(${({image}) => image});
    background-position: center;
    background-repeat: no-repeat;

`
const Sequence = styled.span`

    font-family: Lexend Deca;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
    strong{
        /* Depois tem que implementar outra logica que considera se o recorde é igual a sequencia */
        color: ${({hasColor}) => hasColor?'#8FC549':'#666666'};
    }
    
`