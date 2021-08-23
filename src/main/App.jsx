import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import { BrowserRouter} from "react-router-dom";
import Routes from "./Routes";

import Logo from "../components/templete/Logo";
import Footer from "../components/templete/Footer";
import Home from "../components/home/Home";
import Nav from "../components/templete/Nav";

export default props =>
    <BrowserRouter>
        <div className='app'>
            <Logo/>
            <Nav/>
            <Routes/>
            <Footer/>
        </div>
    </BrowserRouter>

