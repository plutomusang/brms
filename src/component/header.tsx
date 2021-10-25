import React from "react";
import logo from '../svg/BudgetLogo.svg';
import documentType from '../svg/documentType2.svg';
import recepient from '../svg/recepient2.svg';
import report from '../svg/report2.svg';


export const HeaderAB: React.FC =() => {
    return (
        <header className="headerclass">
            <div className="logo">
                <div className="brmsLogoContainer">
                    <div className="brmsTitle"> 
                        <h1> BRMS </h1>
                        <img  src={logo} />
                        <div className="subtitle">Budget Record Management System</div>
                    </div> 
                </div>
            </div>
            
            <input type="checkbox" id="nav-toggle" className="nav-toggle" />
            <label htmlFor="nav-toggle" className = "nav-toggle-label"> 
            <span className="label-span"></span> 
            </label>
            <nav> 
            <ul>
                <li> 
                    <img className="hIcon"src={documentType} /> <a>Documents</a></li>        
                <li> <img className="hIcon" src={recepient} /> <a>Recepients</a></li>
                <li> <img className="hIcon"src={report} /> <a>Reports</a></li> 
            </ul>
            </nav>
            
        </header>
    )
}
export default HeaderAB;