import React, {useEffect} from "react";
import logo from '../svg/BudgetLogo.svg';
import documentType from '../svg/documentType2.svg';
import recepient from '../svg/recepient2.svg';
import report from '../svg/report2.svg';
import {Link, useNavigate } from "react-router-dom";
import logger from "../config/logger";
import { IloginState } from "../page/login";

export interface IHeaderProps {
    logout:()=>{} |void
}


export const HeaderAB: React.FC<IHeaderProps> =(props) => {
    const navigate = useNavigate();
    const onLogOut =()=>{
        document.cookie = 'none';
        const o = document.cookie;  
        logger.info(o);
        props.logout();
        // navigate("/logout");


    }
    useEffect(()=>{

      },[]);
    return (
        <header className="headerclass">
            <div className="headerContainer">
                <div className="logo">
                    <div className="brmsLogoContainer">
                        <div className="brmsTitle"> 
                            <h1> BRMS </h1>
                            <img  src={logo} />
                            <div className="subtitle"> 
                                <span> B</span>
                                <span className="subtext">udget</span> 
                                <span> R</span>
                                <span className="subtext">ecord </span> 
                                <span> M</span>
                                <span className="subtext">anagement</span> 
                                <span> S</span>
                                <span className="subtext">ystem</span>
                            </div>
                        </div> 
                    </div>
                </div>
                
                <input type="checkbox" id="nav-toggle" className="nav-toggle" />
                
                <label htmlFor="nav-toggle" className = "nav-toggle-label"> 
                <span className="label-span"></span> 
                </label>

                <nav> 
                <ul>
                    {/* <li> <img className="hIcon"src={documentType} /> <Link to="/login"> Login </Link></li>        
                    <li> <img className="hIcon" src={recepient} /> <Link to="/workbench">Workbench</Link></li> */}
                         
                    <li> <img className="hIcon" src={recepient} /><a>Workbench</a></li>                    
                    <li> <img className="hIcon"src={report} /> <a>Reports</a></li> 
                    <li onClick={onLogOut}> <img className="hIcon"src={documentType} /><a>Logout</a></li>   
                </ul>
                </nav>
                
            </div>
        </header>
    )
}
export default HeaderAB;