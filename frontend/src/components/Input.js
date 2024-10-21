import React from 'react'

function Input(props) {
  return (
    <>
    <input type={props.type} id={props.id} value={props.value} onChange={props.onChange}/>
    </>
  )
}

export default Input