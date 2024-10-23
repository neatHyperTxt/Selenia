import React from 'react'
import styles from '../css/input.module.css';
function Input(props) {
  return (
    <>
    <input className={styles.input} type={props.type} id={props.id} value={props.value} onChange={props.onChange} placeholder={props.placeholder}/>
    </>
  )
}

export default Input