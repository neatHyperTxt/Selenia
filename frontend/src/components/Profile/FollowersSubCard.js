import React,{useState} from 'react'
import axios from 'axios';
import classes from '../../css/Profile/FollowersSubCard.module.css';
function FollowersSubCard({follower,isFollowing,email}) { 
  const [follow,setFollow] = useState(isFollowing);
  const toggleHandler = async()=>{
    try {
        if(!follow){ // follow the person
            const response = await axios.post('http://localhost:4000/api/follow',{email:email,id:follower._id});
            console.log('From the frontend',response);
            setFollow(true);
        }
        else{
            const response = await axios.post('http://localhost:4000/api/unfollow',{email:email,id:follower._id});
            console.log('From the frontend',response);
            setFollow(false);
        }
    } catch (error) {
        console.log('From the frontend Error Updating',error.message);
    } 
  }
  return (
    <div className={classes.container}>
        <p>{follower.firstname} {follower.lastname}</p>
        <button onClick={toggleHandler}>{!follow ? 'Follow':'Unfollow'}</button>
    </div>
  )
}

export default FollowersSubCard