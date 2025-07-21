import React from 'react'
import {Link} from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
        <Link to="/" classname ="nav-link"> 
        Home

        </Link>
        <Link to="/userlist" classname ="nav-link"> 
        User List
        

        </Link>
    
    </nav>
  )
}