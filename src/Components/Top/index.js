import logoMenu from "../../assets/logo-menu.png"

import { useContext } from "react";
import UserContext from '../../Contexts/UserContext'

import { Container } from "./styles";

export default function Top() {
    const {userData} = useContext(UserContext)
    return(
        <Container>
            <img src={logoMenu} alt='logo-menu'/>
            <img src={userData===null?'':userData.image} alt='logo-menu'/>
        </Container>
    )
}