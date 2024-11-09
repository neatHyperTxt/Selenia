import React,{forwardRef} from 'react'

import FollowersSubCard from './FollowersSubCard';
import classes from '../../css/Profile/FollowersModal.module.css';
import {IoMdClose} from 'react-icons/io'
const FollowersModal = forwardRef(function FollowersModal({followers,following,email},ref) {
  return (
    <dialog ref={ref} className={classes.container}>
        <div className={classes.header}>
            <h1>Followers</h1>
            <form method='dialog'>
                <button><IoMdClose size={24}/></button>
            </form>
        </div>
        <hr />
        <div className={classes.followersListContainer}>
            {followers.map((follower)=>{
                const isFollowing = following.some((followedUser)=>followedUser._id===follower._id);
                console.log(isFollowing);
                return (<FollowersSubCard email={email} isFollowing={isFollowing} follower={follower}/>)
            })}
        </div>
    </dialog>

  )
})

export default FollowersModal