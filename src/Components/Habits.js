import styled from "styled-components"
import plus from "../assets/+.png"
import trash from "../assets/delete.png"
import Top from "./Top"
import Menu from "./Menu"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import UserContext from '../Contexts/UserContext'
import Loader from "react-loader-spinner";
import PercentageDoneContext from "../Contexts/PercentageDoneContext"


export default function Habits() {
    const [habits, setHabits] = useState([])
    const [habitCriationEnabled, setHabitCriationEnabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [habitName, setHabitName] = useState('')
    const [habitDays, setHabitDays] = useState([])
    const [todayHabits, setTodayHabits] = useState([])
    const { setPercentageDone} = useContext(PercentageDoneContext)

    const {userData} = useContext(UserContext)

    const weekDays = [{indexDay:0,nameDay:'D'},
    {indexDay:1,nameDay:'S'},
    {indexDay:2,nameDay:'T'},
    {indexDay:3,nameDay:'Q'},
    {indexDay:4,nameDay:'Q'},
    {indexDay:5,nameDay:'S'},
    {indexDay:6,nameDay:'S'}]

    function getHabits() {
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
        // habitDays.sort((a,b)=>a-b)
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
const MyHabits = styled.div`
    width: 100%;
    height: 75px;
    display:flex;
    justify-content:space-between;

    box-sizing:border-box;
    padding: 28px 0;
    p{
        font-family: Lexend Deca;
        font-size: 22.976px;
        line-height: 29px;

        color: #126BA5;
    }
    `
const Button = styled.button`
        width: 40px;
        height: 35px;

        background: #52B6FF;
        border-radius: 4.63636px;
        border: 0;
        background-image: url(${({image}) => image});
        background-position: center;
        background-repeat: no-repeat;
`
const Message = styled.h1`
    width: 100%;
    height: 74px;

    font-family: Lexend Deca;
    font-size: 17.976px;
    line-height: 22px;

    color: #666666;
    margin-top:30px;
`
const CreateHabit = styled.form`
    width: 100%;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    box-sizing:border-box;
    padding: 16px;
    margin-bottom:10px;

    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:flex-end;
`
const Input = styled.input`
    width: 309px;
    height: 45px;
    
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    padding-left:10px;
    border-radius: 5px;
    font-family: Lexend Deca;
    font-size: 19.976px;
    line-height: 25px;
    
    margin-bottom: 8px;
    outline:none;

    color: ${({disabled}) => disabled ? '#B3B3B3' : '#DBDBDB'};
    background: ${({disabled}) => disabled ? '#F2F2F2' : '#FFFFFF'};
    
    ::placeholder{
        color: #DBDBDB;
    }
`
const Day = styled.button`
    margin-right: 4px;
    width: 30px;
    height: 30px;

    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    font-family: Lexend Deca;
    font-size: 19.976px;
    line-height: 25px;
    
    background: ${({wasClicked})=>wasClicked?'#DBDBDB':'#FFFFFF'};
    color: ${({wasClicked})=>wasClicked?'#FFFFFF':'#DBDBDB'};
`
const FooterButtons = styled.div`
    display:flex;
    gap:5px;
    button:first-child{
        background: #FFFFFF;
        color: #52B6FF;
    }
    button:last-child{
        background: #52B6FF;
        color: #FFFFFF;
    }
`
const SubmitButton = styled.button`
    width: 84px;
    height: 35px;

    border-radius: 4.63636px;
    border:none;
    font-family: Lexend Deca;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    opacity:${({disabled}) => disabled ? 0.7 : 1};
`
const HabitsList = styled.div`
    width: 100%;
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
const Delete = styled.button`
    width:13px;
    height:15px;

    position:absolute;
    top:12.5px;
    right:13px;

    background-image: url(${({image}) => image});
    background-position: center;
    background-repeat: no-repeat;

    border:none;
`