import "./reset.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Habits from './Habits'


export default function App() {
    return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/habits" element={<Habits/>}/>
                </Routes>
            </BrowserRouter>
    )
}