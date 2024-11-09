import React from 'react'
import classes from '../../css/Posts/PostCard.module.css';
function PostCard({imageUrl}) {
  return ( 
    <div className={classes.container}>
      <div style={{
          backgroundColor: 'black',
          height: '275px',
          width: '200px', 
          borderRadius: '5px',
          padding: '1rem',
          backgroundImage:`url(${imageUrl})`,
          backgroundPosition:'center',
          backgroundSize:'cover',
          backgroundRepeat:'no-repeat',
          position:'relative'
      }}>
      </div> 
    </div>
  )
}

export default PostCard