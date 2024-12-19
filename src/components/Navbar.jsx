import React from 'react';
import {NavLink, Link} from "react-router-dom";
import { BiSolidCameraMovie } from "react-icons/bi";

const Navbar = () => {
  const activeStyle={
    color:'red'
  }
  return (
    <div className='navbar'>
      <h1 className="logo"><Link to="/"><BiSolidCameraMovie/></Link></h1>
      <div className="nav">
        <ul>
          <li>
            <NavLink to="/" style={({isActive})=>(isActive ? activeStyle : undefined)}>Home</NavLink>
            <NavLink to="/movies" style={({isActive})=>(isActive ? activeStyle : undefined)}>Movies</NavLink>
            <NavLink to="/event" style={({isActive})=>(isActive ? activeStyle : undefined)}>Event</NavLink>
            <NavLink to="/users" style={({isActive})=>(isActive ? activeStyle : undefined)}>users</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;