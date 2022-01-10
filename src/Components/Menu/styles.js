import styled from "styled-components"

export const Container = styled.div`
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
