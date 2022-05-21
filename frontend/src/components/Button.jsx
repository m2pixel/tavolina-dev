import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { bindActionCreators } from '@reduxjs/toolkit'

export default function Button(props) {
  const style = !props.buttonStyle
    ? 'underline underline-offset-8 decoration-primary w-fit bg-dark text-white hover:text-primary py-5 px-5 text-xl rounded shadow-xl'
    : `${props.buttonStyle} py-5 px-5 text-xl rounded shadow-xl`

  return (
    <button
      className={style}
      onClick={() => {
        props.action(props.obj)
      }}
    >
      {props.title}{' '}
      {props.icon != null && (
        <FontAwesomeIcon className="text-white pl-2" icon={props.icon} />
      )}
    </button>
  )
}
