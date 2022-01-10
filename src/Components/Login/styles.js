import styled from "styled-components"

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
const Button = styled.button`
    width: 303px;
    height: 45px;
    
    border-radius: 4px;
    border:none;
    
    font-family: Lexend Deca;
    font-size: 20.976px;
    line-height: 26px;
    
    background: #52B6FF;
    opacity:${({disabled}) => disabled ? 0.7 : 1};
    color: #FFFFFF;
`
const Input = styled.input`
    width: 303px;
    height: 45px;

    border: 1px solid #D5D5D5;

    box-sizing: border-box;
    padding:10px;

    border-radius: 5px;
    font-family: Lexend Deca;

    font-size: 19.976px;
    line-height: 25px;

    background: ${({disabled}) => disabled ? '#F2F2F2' : '#FFFFFF'};
    color: ${({disabled}) => disabled ? '#AFAFAF' : '#000'};
    
    outline:none;
    ::placeholder{
        color: #DBDBDB;
    }
`
export {Container, Button, Input}