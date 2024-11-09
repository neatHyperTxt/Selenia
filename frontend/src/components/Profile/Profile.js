import React,{useState,useRef} from 'react'
import axios from 'axios'
import { useLoaderData } from 'react-router-dom';

import AddPostModal from './AddPostModal';
import FollowersModal from './FollowersModal';
import PostCard from '../../components/Posts/PostCard';

import classes from '../../css/Profile/Profile.module.css';
// import {} from 'react-icons/fa';
function Profile() {
  const dialog = useRef();
  const followersRef = useRef();
  const loaderData = useLoaderData();
  const user_info = loaderData.userData.data; 
  const posts = loaderData.postsData.data;
  console.log(posts);
  console.log(loaderData.followersData.data);
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
  const followersModalHandler = ()=>{
    followersRef.current.showModal();
  }
  const closeFollowersModalHandler = ()=>{
    followersRef.current.close();
  }
  return (
    <>
    <AddPostModal closeModal={closeModalHandler} email={user_info.email} ref={dialog} onClose={closeModalHandler}/>
    <FollowersModal followers={loaderData.followersData.data} following={loaderData.followingData.data} email={user_info.email} ref={followersRef} onClose={closeFollowersModalHandler}/>

    <div className={classes.userInfo_container}>
      <div className={classes.user_profile_image}/> 
      <div className={classes.user_sub_info}>
        <p className={classes.user_email}>{user_info.email}</p>
        <div className={classes.user_sub_info_1}>
          <p><strong>{postsCount}</strong> posts</p>
          <p onClick={followersModalHandler}><strong>{followersCount}</strong> followers</p>
          <p><strong>{followingCount}</strong> following</p>
        </div>
        <p>{user_info.firstname} {user_info.lastname}</p>
        <p>Bio: {user_info.bio ?? ''}</p>
      </div>
    </div>

    <button onClick={addPostModalHandler} className={classes.addPostButton}>Add Post</button>
    <div className={classes.postContainer}>
      {posts.map((post) => ( 
        <PostCard key={post._id} imageUrl={post.image}/>
      ))}
    </div>
    <div> 
    </div>
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

 
