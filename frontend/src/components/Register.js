import {useState} from 'react';
import Input from './Input';
import Button from './Button';
import axios from 'axios';
import styles from '../css/auth/register.module.css'

function Register() {
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [formErrors,setFormErrors] = useState({
    fname:'',
    lname:'',
    uname:'',
    email:'',
    password:''
  })
  const validate = (data)=>{
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!data.fname){
      errors.fname = "First Name should be present!!";
    }
    if(!data.lname){
      errors.lname = "Last Name should be present!!";
    }
    if(!data.uname){
      errors.uname = "Username should be present!!";
    }
    if(!data.email){
      errors.email = "Email should be present!!";
    }
    else if(!regex.test(data.email)){
      errors.email = "Email should be of the valid format!!";
    }
    if(!data.password){
      errors.password = "Password should be present!!";
    }
    else if(data.password.length < 6){
      errors.password = "Password should be greater than 6 characters!!";
    }
    else if(data.password.length > 15){
      errors.password = "Password should be lesser than 15 characters!!";
    }
    return errors;
  }
  const firstNameHandler = (event)=>{
    setFirstName(event.target.value);
  }
  const lastNameHandler = (event)=>{
    setLastName(event.target.value);
  }
  const usernameHandler = (event)=>{
    setUsername(event.target.value);
  }
  const emailHandler = (event)=>{
    setEmail(event.target.value);
  }
  const passwordHandler = (event)=>{
    setPassword(event.target.value);
  }
  const formHandler = async (event)=>{
    event.preventDefault();
    const data = {
      lname: lastName,
      fname: firstName,
      uname: username,
      email: email,
      password: password
    }
    const errors = validate(data);
    setFormErrors(errors);
    console.log(Object.keys(errors));
    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setPassword('');
    if(Object.keys(errors) === 0){
      try {
        const response = await axios.post('http://localhost:4000/api/register',data);
        console.log('Registration successful');
        console.log(response.data);
      } catch (error) {
        console.log('Registration error');
      }
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <img src="https://plus.unsplash.com/premium_photo-1706625669518-664f071e02af?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGV4cGxvcmV8ZW58MHx8MHx8fDA%3D" alt="" />
      </div>
      <form className={styles.form} onSubmit={formHandler} action="">
        <h1>Create an account</h1>
        <div className={styles.fullnameContainer}>
          <div className={styles.fname}>
            <label htmlFor="fname">First Name</label>
            <Input type="text" name="fname" id="fname" value={firstName} onChange={firstNameHandler} placeholder="First Name"/>
            <p className={styles.paraErrorWarnings}>{formErrors.fname}</p>
          </div>
          <div className={styles.lname}>
            <label htmlFor="lname">Last Name</label>
            <Input type="text" name="lname" id="lname" value={lastName} onChange={lastNameHandler} placeholder="Last Name"/>
            <p className={styles.paraErrorWarnings}>{formErrors.lname}</p>
          </div>
        </div>
        <div>
          <label htmlFor="uname">Username</label>
          <Input type="text" name="uname" id="uname" value={username} onChange={usernameHandler} placeholder="User Name"/>
          <p className={styles.paraErrorWarnings}>{formErrors.uname}</p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input type="email" name="email" id="email" value={email} onChange={emailHandler} placeholder="Email"/>
          <p className={styles.paraErrorWarnings}>{formErrors.email}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input type="password" name="password" id="password" value={password} onChange={passwordHandler} placeholder="Password"/>
          <p className={styles.paraErrorWarnings}>{formErrors.password}</p>
        </div>
        <Button type="submit" title="Register"/>
      </form>
      <div/>
    </div>
  );
}
export default Register;
