import React from 'react'
import './uiStyle/Input.scss'

function Input({placeholder, type}) {
  return (
    <input type={type ? `${type}` : `text`} className='Input' placeholder={`${placeholder}`} />
  )
}

export default Input