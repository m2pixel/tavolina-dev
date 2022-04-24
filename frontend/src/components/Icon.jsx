import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Icon({ icon, toggle }) {
  // console.log(toggle)
  const style = icon.clicked
    ? 'text-secondary text-xl md:border-2 border-secondary rounded py-2 px-2 md:px-4'
    : 'text-primary md:border-2 border-primary rounded text-xl py-2 px-2 md:px-4 hover:text-secondary'
  return (
    <li className={style} onClick={() => toggle(icon.id)}>
      <FontAwesomeIcon icon={icon.icon} />
    </li>
  )
}
