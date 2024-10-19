import React from 'react'

function Button(props) {
  return (
    <>
    <button type={props.type}>{props.title}</button>
    </>
  )
}

export default Button