import {useState} from 'react';
import Input from './Input';
import Button from './Button';
import axios from 'axios';
import styles from '../css/auth/register.module.css'

function Login(props) {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [formErrors,setFormErrors] = useState({
    email:'',
    password:''
  })
  const validate = (data)=>{
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
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
  const emailHandler = (event)=>{
    setEmail(event.target.value);
  }
  const passwordHandler = (event)=>{
    setPassword(event.target.value);
  }
  const formHandler = async (event)=>{
    event.preventDefault();
    const data = {
      email: email,
      password: password
    }
    const errors = validate(data);
    setFormErrors(errors);
    console.log(Object.keys(errors));
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
        <div className={styles.imageContainer}>
        <img src="https://plus.unsplash.com/premium_photo-1669741909456-61b8b9b3f329?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmVydGljYWwlMjBsYW5kc2NhcGV8ZW58MHwxfDB8fHww" alt="" />
        </div>
      </div>
      <form className={styles.form} onSubmit={formHandler} action="">
        <h1>Login</h1>
        <p>New here? <a onClick={props.toggle}>Create an account</a></p>
        <div>
          <Input type="email" name="email" id="email" value={email} onChange={emailHandler} placeholder="Email"/>
          <p className={styles.paraErrorWarnings}>{formErrors.email}</p>
        </div>
        <div>
          <Input type="password" name="password" id="password" value={password} onChange={passwordHandler} placeholder="Enter your password"/>
          <p className={styles.paraErrorWarnings}>{formErrors.password}</p>
        </div>
        <Button type="submit" title="Login"/>
      </form>
      <div/>
    </div>
  );
}
export default Login;
