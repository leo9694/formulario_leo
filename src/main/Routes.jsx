import React from "react";
import  {Switch, Route, Redirect} from "react-router";
import Home from "../components/home/Home";
import UserCrud from "../components/user/UserCrud";
import Cadastro from "../components/user/Cadastro";
import Routes from "./Routes";


export default props =>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/users' component={UserCrud}/>
        <Route path='/cadastro' component={Cadastro}/>
        <Redirect from='*' to='/'/>
    </Switch>