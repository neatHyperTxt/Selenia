import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import axios from 'axios';
import styles from '../../css/auth/register.module.css';
import { authActions } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    fname: '',
    lname: '',
    uname: '',
    email: '',
    password: ''
  });
  const [backendError, setBackendError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [countdown, setCountdown] = useState(5);

  const resetErrorHandler = () => {
    setBackendError('');
  };

  const validate = (data) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!data.fname) errors.fname = "First Name should be present!!";
    if (!data.lname) errors.lname = "Last Name should be present!!";
    if (!data.email) {
      errors.email = "Email should be present!!";
    } else if (!regex.test(data.email)) {
      errors.email = "Email should be of the valid format!!";
    }
    if (!data.password) {
      errors.password = "Password should be present!!";
    } else if (data.password.length < 6) {
      errors.password = "Password should be greater than 6 characters!!";
    } else if (data.password.length > 15) {
      errors.password = "Password should be lesser than 15 characters!!";
    }
    return errors;
  };

  const formHandler = async (event) => {
    event.preventDefault();
    const data = { fname: firstName, lname: lastName, email, password,bio:'',followers:[],following:[]};
    const errors = validate(data);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        setBackendError('');
        console.log('From the frontend', data);
        const response = await axios.post('http://localhost:4000/api/register', data);
        
        localStorage.setItem('isAuthenticated', email);
        setSuccessMessage('Registration successful! You will be redirected in 5 seconds');
        console.log(response.data);  

        const countdownTimer = (timeLeft) => {
          if (timeLeft > 0) {
            setCountdown(timeLeft - 1);
            setTimeout(() => countdownTimer(timeLeft - 1), 1000);
          } else {
            navigate('/'); 
            dispatch(authActions.login());
          }
        };
        countdownTimer(5);
      } catch (error) {
        setBackendError(
          error.response?.data?.message || 'An unexpected error occurred. Please try again.'
        );
      }
    }
  };

  return (
    <>
      {successMessage && <p>{successMessage.replace(5, countdown)}</p>}
      {backendError && <p>{backendError} <a onClick={resetErrorHandler}>Close</a></p>}
      <div className={styles.container}>
        <div>
          <div className={styles.imageContainer}>
            <img src="https://plus.unsplash.com/premium_photo-1669741909456-61b8b9b3f329?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmVydGljYWwlMjBsYW5kc2NhcGV8ZW58MHwxfDB8fHww" alt="" />
          </div>
        </div>
        <form className={styles.form} onSubmit={formHandler}>
          <h1>Create an account</h1>
          <p>Already have an account? <Link to='/auth/login'>Log in</Link></p>
          <div className={styles.fullnameContainer}>
            <div className={styles.fname}>
              <Input type="text" name="fname" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
              <p className={styles.paraErrorWarnings}>{formErrors.fname}</p>
            </div>
            <div className={styles.lname}>
              <Input type="text" name="lname" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
              <p className={styles.paraErrorWarnings}>{formErrors.lname}</p>
            </div>
          </div>
          <div>
            <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <p className={styles.paraErrorWarnings}>{formErrors.email}</p>
          </div>
          <div>
            <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            <p className={styles.paraErrorWarnings}>{formErrors.password}</p>
          </div>
          <label className={styles.terms_label}>
            <input type="checkbox" name="terms" required />
            I agree to the <a href=""> Terms & Conditions</a>
          </label>
          <Button type="submit" title="Create Account" />
        </form>
        <div />
      </div>
    </>
  );
}

export default Register;
