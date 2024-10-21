import {useState} from 'react';
import Input from './Input';
import Button from './Button';
import axios from 'axios';

import styles from '../css/auth/login.module.css'

function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
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
    setEmail('');
    setPassword('');
    try {
      const response = await axios.post('http://localhost:4000/api/login',data);
      console.log(response.data.message,response.data.user);
    } catch (error) {
      console.log('Login failed. Please check credentials');
    }
  }
  return (
    <div className={styles.register}>
      <div>
        <h1>Create an account</h1>
        <img src="https://plus.unsplash.com/premium_photo-1706625669518-664f071e02af?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGV4cGxvcmV8ZW58MHx8MHx8fDA%3D" alt="" />
      </div>  
      <form onSubmit={formHandler} action="">
        <div>
          <label htmlFor="email">Email</label>
          <Input type="email" name="email" id="email" value={email} onChange={emailHandler}/>
        </div>
        <div>
          <label htmlFor="">Password</label>
          <Input type="password" name="password" id="password" value={password} onChange={passwordHandler}/>
        </div>
        <Button type="submit" title="Login"/>
      </form>
      <div/>
    </div>
  );
}
export default Login;
