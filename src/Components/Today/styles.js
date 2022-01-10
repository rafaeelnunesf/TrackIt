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
export {Container, Day, DayProgrss, Habits, Habit, Done, Sequence}