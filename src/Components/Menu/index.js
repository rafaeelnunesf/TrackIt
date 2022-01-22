import { useNavigate } from "react-router";
import { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import PercentageDoneContext from "../../Contexts/PercentageDoneContext";
import { Container } from "./styles";

export default function Menu() {
  const { percentageDone } = useContext(PercentageDoneContext);
  let navigate = useNavigate();
  return (
    <Container>
      <h1 onClick={() => navigate("/habits")}>Habitos</h1>
      <div onClick={() => navigate("/today")}>
        <CircularProgressbar
          value={percentageDone}
          text={`Hoje`}
          background
          backgroundPadding={6}
          styles={buildStyles({
            backgroundColor: "#52B6FF",
            textColor: "#fff",
            textSize: "18px",
            pathColor: "#fff",
            trailColor: "transparent",
          })}
        />
      </div>
      <h1 onClick={() => navigate("/historic")}>Histórico</h1>
    </Container>
  );
}
