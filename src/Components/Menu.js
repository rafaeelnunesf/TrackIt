import styled from "styled-components"
import { useNavigate } from "react-router"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PercentageDoneContext from "../Contexts/PercentageDoneContext";
import { useContext } from "react/cjs/react.development";

export default function Menu() {
    const {percentageDone} = useContext(PercentageDoneContext)
    let navigate = useNavigate()
    return(
        <Container>
            <h1 onClick={()=>navigate('/habits')}>Habitos</h1>
                <div onClick={()=>navigate('/today')}>
                    <CircularProgressbar
                        value={percentageDone}
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
                </div>
                <h1 onClick={()=>navigate('/historic')}>Histórico</h1>
        </Container>
    )
}

const Container = styled.div`
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