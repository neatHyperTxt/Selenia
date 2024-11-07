import {NavLink} from 'react-router-dom';
import React from 'react'
import classes from '../css/MainNavigation.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import ProfileDropdown from './ProfileDropdown';
import {CgChevronLeft} from 'react-icons/cg';
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
                    <NavLink className={classes.go_back} to="..">
                    <CgChevronLeft className={classes.go_back_button} size={30}/> 
                    </NavLink>
                </li>  
                <li>
                    <ProfileDropdown/>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default MainNavigation