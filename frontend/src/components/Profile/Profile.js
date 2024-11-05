import React from 'react'
import axios from 'axios'
import { useLoaderData } from 'react-router-dom';
function Profile() {
  const loaderData = useLoaderData();
  const user_info = loaderData.data;
  console.log("From profile page",user_info);
  return (
    <>
    <h1>This is profile of {user_info.firstname}</h1>
    </>
  )
}

export default Profile

const email = localStorage.getItem('isAuthenticated');
 

export const profileDataLoader = async()=>{
  try {
    const response = await axios.get('http://localhost:4000/api/profile', {
      params: { email }
    });
    console.log(response.data);
    return response.data; // Return response.data directly if it contains the user info
  } catch (error) {
    console.log('The profile could not be loaded');
    console.log(error);
    throw new Error('Profile data could not be loaded');
  }
};

 
