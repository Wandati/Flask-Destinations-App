import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return(
        <nav className='nav' style={{width:"100%",height:"50px",marginTop:"0px"}}>
           <ul>
             <li style={{fontSize:"20px"}}><NavLink to="/Login">Log in</NavLink></li>
             <li style={{fontSize:"20px"}}><NavLink to="/Location">Home</NavLink></li>
             <li style={{fontSize:"20px"}}><NavLink to="/Review">Reviews</NavLink></li>
             <li style={{fontSize:"20px"}} ><NavLink to="/Signup">Sign up</NavLink></li>
            </ul>
        </nav>
        
    )
}