import "./reset.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Habits from './Habits'
import Today from './Today'
import Historic from './Historic'
import { useState } from "react";
import UserContext from "../Contexts/UserContext";


export default function App() {
    const [userData , setUserData] = useState({image:'',token:''})
    return(
        <UserContext.Provider value={{userData, setUserData}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/today" element={<Today/>}/>
                    <Route path="/habits" element={<Habits/>}/>
                    <Route path="/historic" element={<Historic/>}/>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}