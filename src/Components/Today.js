import styled from "styled-components"
import logoMenu from "../assets/logo-menu.png"
import check from "../assets/check.png"
import { useNavigate } from "react-router"
import { useContext } from "react";
import UserContext from '../Contexts/UserContext'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'dayjs/locale/es'
import dayjs from "dayjs";

export default function Today() {
    const {userData} = useContext(UserContext)
    const habitosDeHoje = [
        {
            id: 3,
            name: 'Acordar',
            done: true,
            currentSequence: 1,
            highestSequence: 1
        },
        {
            id: 5,
            name: 'mijar',
            done: false,
            currentSequence: 1,
            highestSequence: 1
        },
        {
            id: 5,
            name: 'beber agua',
            done: true,
            currentSequence: 4,
            highestSequence: 5
        },
        {
            id: 3,
            name: 'Acordar',
            done: true,
            currentSequence: 1,
            highestSequence: 1
        },
        {
            id: 5,
            name: 'mijar',
            done: true,
            currentSequence: 1,
            highestSequence: 1
        },
        {
            id: 5,
            name: 'beber agua',
            done: true,
            currentSequence: 1,
            highestSequence: 1
        },
        {
            id: 3,
            name: 'Acordar',
            done: true,
            currentSequence: 1,
            highestSequence: 1
        },
        {
            id: 5,
            name: 'mijar',
            done: true,
            currentSequence: 1,
            highestSequence: 1
        },
        {
            id: 5,
            name: 'beber agua',
            done: true,
            currentSequence: 1,
            highestSequence: 1
        }
    ]
    const percentage = 20;
    console.log(userData.image)
    return(
        <Container>
            <Top>
                <img src={logoMenu} alt='logo-menu'/>
                <img src={userData.image} alt='logo-menu'/>
            </Top>
            <Day>
                <h1>{`${dayjs().format('dddd, DD/MM')}`}</h1>
                <h2>Nenhum hábito concluído ainda</h2>
            </Day>
            <Habits>
                {habitosDeHoje.map(({name,done,currentSequence,highestSequence})=>(
                    <Habit>
                        <p>{name}</p>
                        <div>
                            <Sequence hasColor={done } >Sequência atual: <strong>{`${currentSequence} dias`}</strong></Sequence>
                            <br/>
                            <Sequence hasColor={done && currentSequence===highestSequence} >Seu recorde: <strong>{`${highestSequence} dias`}</strong></Sequence>
                        </div>
                        <Done done={done} image={check}/>
                    </Habit>
                ))}
            </Habits>
            <Menu>
                <h1>Habitos</h1>
                <CircularProgressbar 
                    value={percentage}
                    text={`Hoje`}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#52B6FF",
                        textColor: "#fff",
                        textSize: '18px',
                        pathColor: "#fff",
                        trailColor: "transparent"
                      })}
                />
                <h1>Histórico</h1>
            </Menu>
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
const Top = styled.div`
    width: 375px;
    height: 70px;
    position:sticky;
    top:0;
    z-index:1;

    box-sizing:border-box;
    padding: 10px 18px;

    display:flex;
    justify-content: space-between;
    align-items:center;

    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    img:first-child{
        max-height:35px;
    }
    img:last-child{
        width: 51px;
        height: 51px;
        border-radius: 100px;
    }
`
const Menu = styled.div`
    width: 375px;
    height: 70px;

    position:absolute;
    bottom:0;
    z-index:1;

    display:flex;
    align-items:center;
    justify-content:space-between;

    box-sizing:border-box;
    padding: 25px 35px;


    background: #FFFFFF;
    /* background:red; */
    h1{
        font-family: Lexend Deca;
        font-size: 18px;
        line-height: 22px;
        text-align: center;

        color: #52B6FF;
    }
    svg{
        width:91px;
        height:91px;
        position:absolute;
        bottom:10px;
        left:0;
        right:0;
        margin: auto;
        
    }
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
    h2{
        font-family: Lexend Deca;
        font-size: 17.976px;
        line-height: 22px;

        color: #BABABA;
    }
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