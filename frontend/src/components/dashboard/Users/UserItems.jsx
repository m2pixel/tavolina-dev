import React from 'react'
import { Link } from 'react-router-dom'

export default function UserItems({ user, deleteUserUI }) {
  return (
    <tr className="border-b">
      <td className="px-6 py-4 text-sm text-dark ">{user.name}</td>
      <td className="px-6 py-4 text-sm text-dark ">
        <span
          className={
            user.role.permission
              ? 'bg-tableOff rounded-3xl font-semibold text-white py-1 px-4'
              : 'font-semibold text-dark py-1 px-4'
          }
        >
          {user.role.role}
        </span>
      </td>
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col md:flex-row items-center gap-2 ">
          <Link to={`/dashboard/users/${user._id}`}>
            <button className="w-16 bg-secondary text-white xs:text-xs px-2 py-1 rounded font-semibold">
              Edit
            </button>
          </Link>
          <button
            className="w-16 bg-primary text-white xs:text-xs px-2 py-1 rounded font-semibold"
            onClick={() => deleteUserUI(user._id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}
