import React,{useState,useRef} from 'react'
import axios from 'axios'
import { useLoaderData } from 'react-router-dom';
import AddPostModal from './AddPostModal';

function Profile() {
  const dialog = useRef();
  const loaderData = useLoaderData();
  const user_info = loaderData.userData.data; 
  const posts = loaderData.postsData.data;
  console.log(posts);
  console.log("From profile page",loaderData);
  const postsCount = Object.keys(loaderData.postsData.data).length;
  const followersCount = Object.keys(loaderData.followersData.data).length;
  const followingCount = Object.keys(loaderData.followingData.data).length;
  const addPostModalHandler = () => {
    dialog.current.showModal();  
  };

  const closeModalHandler = () => { 
    dialog.current.close();  
  };
  return (
    <>
    <AddPostModal closeModal={closeModalHandler} email={user_info.email} ref={dialog} onClose={closeModalHandler}/>
    <h1>This is profile of {user_info.firstname}</h1>
    <h2>The email is {user_info.email}</h2>
    <div>
      <h3>Posts {postsCount}</h3>
      <h3>Followers {followersCount}</h3>
      <h3>Following {followingCount}</h3>
    </div>
    {posts.map((post) => (
          <img key={post._id} src={post.image} alt="Post" />
        ))}
    <div> 
    </div>
    <button onClick={addPostModalHandler}>Add Post</button>
    <button onClick={()=>{
      axios.post('http://localhost:4000/api/test')
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
    
    }}>Test</button>
    </>
  )
}

export default Profile

const email = localStorage.getItem('isAuthenticated');
 

export const profileDataLoader = async()=>{
  try {
    const userDataResponse = await axios.get('http://localhost:4000/api/profile', {
      params: { email }
    });
    console.log(userDataResponse.data);
    const userFollowersResponse = await axios.get('http://localhost:4000/api/followers',{
      params: { email }
    });
    const userFollowingResponse = await axios.get('http://localhost:4000/api/following',{
      params: { email }
    })
    const userPostsResponse = await axios.get('http://localhost:4000/api/userPosts',{
      params:{email}
    });
    return {
      userData: userDataResponse.data,
      followersData: userFollowersResponse.data,
      followingData: userFollowingResponse.data,
      postsData: userPostsResponse.data
    }
  } catch (error) {
    console.log('The profile could not be loaded');
    console.log(error);
    throw new Error('Profile data could not be loaded');
  }
};

 
