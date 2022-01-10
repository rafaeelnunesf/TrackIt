import styled from "styled-components";

export const Container = styled.div`
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