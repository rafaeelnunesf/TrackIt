import "../reset.css"

import PercentageDoneContext from "../../Contexts/PercentageDoneContext";
import UserContext from "../../Contexts/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "../Login/";
import Register from "../Register/";
import Habits from '../Habits/'
import Today from '../Today/'
import Historic from '../Historic/'

export default function App() {
    const userDataOnLocalStorage = localStorage.getItem("UserData")
    const serializedUserData = JSON.parse(userDataOnLocalStorage)

    const [userData , setUserData] = useState(serializedUserData)
    const [percentageDone, setPercentageDone] = useState(0)
    
    function setAndPersistUserData(userData) {
		setUserData({...userData});
        const serializedUserData = JSON.stringify(userData)
		localStorage.setItem("UserData", serializedUserData);
	}
    return(
        <UserContext.Provider value={{userData, setUserData,setAndPersistUserData}}>
            <PercentageDoneContext.Provider value={{percentageDone,setPercentageDone}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/today" element={<Today/>}/>
                        <Route path="/habits" element={<Habits/>}/>
                        <Route path="/historic" element={<Historic/>}/>
                    </Routes>
                </BrowserRouter>
            </PercentageDoneContext.Provider>
        </UserContext.Provider>
    )
}