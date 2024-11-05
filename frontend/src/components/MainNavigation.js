import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import React from 'react'
import classes from '../css/MainNavigation.module.css';
function MainNavigation() {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const [isAuthed,setisAuthed] = useState((isAuthenticated?true:false));
  const logoutHandler = ()=>{
    localStorage.removeItem('isAuthenticated');
    setisAuthed(false);
  }
  return ( 
    <header className={classes.header}>
        <nav>
            <ul className={classes.list}>
                <li>
                    <NavLink to="..">Back</NavLink>
                </li>
                <li>
                    <NavLink to="link1" className={({isActive})=> isActive? classes.active:''} end>Link1</NavLink>
                </li>
                <li>
                    <NavLink to="link2" className={({isActive})=> isActive? classes.active:''} end>Link2</NavLink>
                </li>
                <li>
                    {isAuthed ? <NavLink to="/profile" className={({isActive})=> isActive? classes.active:''} end>Profile</NavLink>
                    : <NavLink to="/auth/login" className={({isActive})=> isActive? classes.active:''} end>Sign In</NavLink>
                    } 
                </li>
                <li>
                    {isAuthed && <NavLink to="/" onClick={logoutHandler}>Log Out</NavLink>}
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default MainNavigation