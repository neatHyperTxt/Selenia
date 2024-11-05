import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import HomePage from './components/HomePage';
import RootLayout from './components/RootLayout';
import ErrorPage from './components/ErrorPage';
import Profile,{profileDataLoader} from './components/Profile/Profile'; 
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {index:true,element:<HomePage/>},
        {path:'link1',element:<HomePage/>},
        {
          path:'profile',
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              element: <Profile />,
              loader: profileDataLoader
            }
          ]
        }
      ]
    },
    {
      path:'/auth',
      element:<RootLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          index:true,
          path: 'login',
          element: <Login/>,
        },
        {
          path: 'register',
          element: <Register/>,
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
