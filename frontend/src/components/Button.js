import React from 'react'
import styles from '../css/button.module.css'
function Button(props) {
  return (
    <>
    <button className={styles.button} type={props.type}>{props.title}</button>
    </>
  )
}

export default Button