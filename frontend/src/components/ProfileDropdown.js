import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authActions } from '../store/authSlice';
import { FaUserCircle } from 'react-icons/fa';
import classes from '../css/MainNavigation.module.css';

function ProfileDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const logoutHandler = () => {
    localStorage.removeItem('isAuthenticated');
    dispatch(authActions.logout());
    setIsDropdownOpen(false);
  };
 
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  }; 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      className={classes.profileContainer} 
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
      ref={dropdownRef}
    > 
      <FaUserCircle 
        className={classes.userIcon} 
        onClick={toggleDropdown} 
        size={24} 
      /> 
      {isDropdownOpen && (
        <ul className={classes.dropdownMenu}>
          {isAuthenticated ? (
            <>
              <li>
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => isActive ? classes.active : ''} 
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/" 
                  onClick={logoutHandler} 
                >
                  Log Out
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink 
                to="/auth/login" 
                className={({ isActive }) => isActive ? classes.active : ''} 
                onClick={() => setIsDropdownOpen(false)}
              >
                Sign In
              </NavLink>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileDropdown;
