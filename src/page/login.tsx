import React from "react";
import { useState, useContext, useEffect, useRef }  from "react";
import routerContext from "../typescript/context_router";
import logo from '../svg/BudgetLogo.svg';
export const Login: React.FC =() => {
    const routers = useContext(routerContext);
    const [username, usernameSet] = useState('');
    const [password, passwordSet] = useState('');

    const onUsername =(event:React.ChangeEvent<HTMLInputElement>) => usernameSet (event.target.value);
    const onPassword =(event:React.ChangeEvent<HTMLInputElement>) => passwordSet (event.target.value);
    const login =()=> {
        routers.login(username,password)
    }
    return (
    <div className="login">  
        <div className="wrapper">
            <div className="container">
                {/* <!-- Form element start here --> */}
                <div className="form-elements">
                    <h1>Welcome</h1>
                    <div className="logo">
                    <a href="#" title="">
                        <img src="images/logo-aam.svg" alt="" title=""/>
                    </a>
                    </div>
                    
                    <form className="form">
                        <label  htmlFor="username"  >Username</label>
                        <input type="text" id="username" placeholder=""/>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password"placeholder=""/>
                        <button  id="login-button" onClick={login}>Login</button>
                    </form>
                </div>
                {/* <!-- Form element end here --> */}
            </div>
            {/* <!-- Bubble element start here --> */}
            <ul className="bg-bubbles">
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
                <li><img  src={logo} /></li>
            </ul>
            {/* <!-- Bubble element start here --> */}
        </div>
    </div>     
    )
}


export default Login;