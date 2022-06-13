import React from 'react'
import { Link } from 'react-router-dom'

export default function UserItems({ user, deleteUserUI }) {
  return (
    <tr className="border-b">
      <td className="px-6 py-4 text-sm text-dark ">{user.name}</td>
      <td className="px-6 py-4 text-sm text-dark ">{user.email}</td>
      <td className="px-6 py-4 text-sm text-dark ">
        <span
          className={
            user.role === 'admin'
              ? 'bg-tableOff rounded-3xl font-semibold text-white py-1 px-4'
              : 'font-semibold text-dark py-1 px-4'
          }
        >
          {user.role}
        </span>
      </td>
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <Link to={`/dashboard/users/${user._id}`}>
          <button className="bg-secondary text-white px-2 py-1 rounded font-semibold">
            Edit
          </button>
        </Link>
      </td>
      <td className="text-sm text-dark  font-light px-6 py-4">
        <button
          className="bg-primary text-white px-2 py-1 rounded font-semibold"
          onClick={() => deleteUserUI(user._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}
