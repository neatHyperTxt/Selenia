import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import router from './router_paths'
import { authActions } from './store/authSlice';
function App() {    
  const dispatch = useDispatch();
  useEffect(()=>{
    if(localStorage.getItem("isAuthenticated")){ 
      dispatch(authActions.login());
    }
    else{
      dispatch(authActions.logout());
    } 
  },[dispatch])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
