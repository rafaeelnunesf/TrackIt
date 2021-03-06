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
p{
    font-family: Lexend Deca;
    font-size: 17.976px;
    line-height: 22px;

    color: #666666;
}
`
const MyHistoric = styled.div`
width:100%;
box-sizing:border-box;
padding:28px 0;
p{
    font-family: Lexend Deca;
    font-size: 22.976px;
    line-height: 29px;

    color: #126BA5;
}
`
export{Container, MyHistoric}