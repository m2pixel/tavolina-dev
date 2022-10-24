import React from 'react'
import { Link } from 'react-router-dom'
export default function Access() {
  return (
    <div>
      401: not autorized
      <p>
        Go back to <Link to="/login">Log in</Link> page
      </p>
    </div>
  )
}
