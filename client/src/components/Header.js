import React from 'react';

import {Link} from 'react-router-dom';
import { useUser } from "./UserContext"; 

// import Logo from '../assets/img/logo.svg'

function Header () {

  const { setUser } = useUser(); 

  function handleLogoutClick(e) {
    e.preventDefault();
    setUser({});
    localStorage.removeItem("id");
    window.location = "/";
  }

let id = localStorage.getItem("id")


  return (
    <header className='py-6 border-b'> 
      <div className='container mx-auto flex justify-between items-center'>
        {/* <Link to='/'>
          <img src={Logo} alt='' /> 
        </Link> */}
        <div> 
        <Link to="/" className='text-2xl font-semibold leading-none mb-6 text-[#007423]'>DestinationKenya
          </Link>
        </div>
        {/* <div>

        <Link to="/locations" class="list">locations
          </Link>
          <Link to="/destinations" class="list">Destinations
          </Link>
          <Link to="/reviews" class="list">Reviews
          </Link>

        </div> */}
        
          
        <div className='flex items-center gap-8'>
        <Link to="/locations" className='hover:text-[#0dcc46] transition'>Locations
          </Link>
          <Link to="/destinations" className='hover:text-[#0dcc46] transition'>Destinations
          </Link>
          <Link to="/reviews" className='hover:text-[#0dcc46] transition'>Reviews
          </Link>
          <Link className='hover:text-[#0dcc46] transition' to='/sign-in'>Log in</Link>
          <Link className='bg-[#007423] hover:bg-[#0dcc46] text-white px-4 py-3 rounded-lg transition ' to='/sign-up'>Sign up</Link>
          <Link to="/logout" class="list">
            {id != null && (
         <button onClick={(e) => handleLogoutClick(e)}>Logout</button>

        )}
          </Link>

        </div>

      </div>
    </header>
  )
}

export default Header
