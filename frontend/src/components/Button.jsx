import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { bindActionCreators } from '@reduxjs/toolkit'

export default function Button(props) {
  const style = !props.buttonStyle
    ? 'py-5 underline underline-offset-8 decoration-primary w-fit px-5 bg-dark text-white font-medium text-xl rounded shadow-xl hover:text-primary'
    : `${props.buttonStyle} py-5 px-5 font-medium text-xl rounded shadow-xl`

  return (
    <button
      className={style}
      onClick={() => {
        props.action(props.obj)
      }}
    >
      {props.title}{' '}
      {props.icon != null && (
        <FontAwesomeIcon className="text-primary pl-3" icon={props.icon} />
      )}
    </button>
  )
}
