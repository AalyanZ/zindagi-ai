import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.png';

const Nav = ()=>{
    return(
        <div className="website">
            <img 
            alt="logo"
            className="logo"
            src={logo}/>
            <ul className="nav-ul">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/solution'>Solution</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
                <li><Link to='/login'>Login</Link></li>
            </ul>
        </div>
    )
}

export default Nav;