import styled from "styled-components"

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
export {Container, MyHabits, Button, Message, CreateHabit, Input, Day, FooterButtons, SubmitButton, HabitsList, Habit, Delete}