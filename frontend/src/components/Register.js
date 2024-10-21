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
    console.log(data);
    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setPassword('');
    try {
      const response = await axios.post('http://localhost:4000/api/register',data);
      console.log('Registration successful');
      console.log(response.data);
    } catch (error) {
      console.log('Registration error');
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
          <label htmlFor="fname">First Name</label>
          <Input type="text" name="fname" id="fname" value={firstName} onChange={firstNameHandler}/>
        </div>
        <div>
          <label htmlFor="lname">Last Name</label>
          <Input type="text" name="lname" id="lname" value={lastName} onChange={lastNameHandler}/>
        </div>
        <div>
          <label htmlFor="uname">Username</label>
          <Input type="text" name="uname" id="uname" value={username} onChange={usernameHandler}/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input type="email" name="email" id="email" value={email} onChange={emailHandler}/>
        </div>
        <div>
          <label htmlFor="">Password</label>
          <Input type="password" name="password" id="password" value={password} onChange={passwordHandler}/>
        </div>
        <Button type="submit" title="Register"/>
      </form>
      <div/>
    </div>
  );
}
export default Register;
