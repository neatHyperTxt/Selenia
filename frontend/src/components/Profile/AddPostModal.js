import React, { useState,useRef,forwardRef } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import classes from '../../css/Profile/AddPostModal.module.css';


const AddPostModal = forwardRef(function AddPostModal(props, ref) { 
  const navigate = useNavigate();
  const imageRef = useRef();
  const captionRef = useRef(); 
  const submitHandler = async(event) => {
    event.preventDefault();
    const data = {
        email:props.email,
        image:imageRef.current.value,
        caption:captionRef.current.value
    }
    console.log(data);
    try {
        const response = await axios.post('http://localhost:4000/api/addPost', data);
        console.log('Post created successfully:', response.data); 
        imageRef.current.value = '';
        captionRef.current.value = '';
        props.closeModal();
        navigate('/profile');
      } catch (error) {
        console.error('Error creating post:', error.response?.data || error.message);
      }
  };

  return (
    <> 
        <dialog ref={ref} className={classes.modal_container}>
        <h1>Add A Post</h1>
        <form onSubmit={submitHandler} method="dialog">
            <div className={classes.input}>
                <input  
                    ref={imageRef}
                    placeholder=" " 
                    className={classes.input_field}
                    type="url" 
                />
                <label className={classes.input_label}>Image URL</label>
            </div>
            <div className={classes.input}>
                <input 
                    ref={captionRef}
                    placeholder=" " 
                    className={classes.input_field}
                    type="text"   
                />
                <label className={classes.input_label}>Caption</label>
            </div> 
            <div className={classes.submitHandler}>
                <button type="submit" onSubmit={submitHandler}>Add</button>
                <button type="button" onClick={props.onClose}>Close</button>
            </div>
        </form>
        </dialog>
    </>
  );
});

export default AddPostModal;
