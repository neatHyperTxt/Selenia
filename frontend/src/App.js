import './App.css';
import Button from './components/Button';

const formHandler = (event)=>{
  event.preventDefault();
}

function App() {
  return (
    <div className="App">
      <h1>Welcome to homepage!!!</h1>
      <form onSubmit={formHandler} action="">
        <div>
          <label htmlFor="fname">First Name</label>
          <input type="text" name="fname" id="fname"/>
        </div>
        <div>
          <label htmlFor="lname">Last Name</label>
          <input type="text" name="lname" id="lname"/>
        </div>
        <div>
          <label htmlFor="uname">Username</label>
          <input type="text" name="uname" id="uname"/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email"/>
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" name="password" id="password"/>
        </div>
        <Button type="submit" title="Login"/>
        {/* <Button type="submit" title="Register"/> */}
      </form>
    </div>
  );
}
export default App;
