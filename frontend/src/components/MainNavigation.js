import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import React from 'react'
import classes from '../css/MainNavigation.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
function MainNavigation() {
  const dispatch = useDispatch();   
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);     
  const logoutHandler = ()=>{
    localStorage.removeItem('isAuthenticated'); 
    dispatch(authActions.logout());
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
                    {isAuthenticated ? <NavLink to="/profile" className={({isActive})=> isActive? classes.active:''} end>Profile</NavLink>
                    : <NavLink to="/auth/login" className={({isActive})=> isActive? classes.active:''} end>Sign In</NavLink>
                    } 
                </li>
                <li>
                    {isAuthenticated && <NavLink to="/" onClick={logoutHandler}>Log Out</NavLink>}
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default MainNavigation