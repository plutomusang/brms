import React from "react";
import { useState, useContext, useEffect, useRef }  from "react";
import routerContext from "../typescript/context_router";
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
        <div className="logincontainer">      
            <h2>Welcome</h2>
            <form action="">
                <input type="text"  placeholder="username" onChange={onUsername} />
                <input type="password"  placeholder="username"  onChange={onPassword}/>
                <input type="submit"  placeholder="username" value="Login" onClick={login}/>
            </form>
            
      </div>
    )
}

export default Login;