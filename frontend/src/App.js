import { useState } from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';

function App() {

  const [showLogin,setShowLogin] = useState(true);
  const toggleShowLoginHandler = ()=>{
    setShowLogin(!showLogin);
  }
  return (
    <div className="App">
      <>
      {showLogin? (
        <Login toggle={toggleShowLoginHandler}/>
      ):
      (<Register toggle={toggleShowLoginHandler}/>)
      }
      </>
    </div>
  );
}
export default App;
