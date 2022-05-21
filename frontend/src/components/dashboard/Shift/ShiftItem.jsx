import React, { useEffect } from 'react'
import { getUser } from '../../../features/users/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../Spinner'

export default function ShiftItem({ shift, close }) {
  const { user, message, isLoading, isSuccess, isError } = useSelector(
    (state) => state.users
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser(shift.user))
  }, [dispatch, shift.user])

  if (isLoading) {
    return (
      <tr className="border-b">
        <td>
          <Spinner />
        </td>
      </tr>
    )
  }
  return (
    <tr className="border-b">
      <td className="px-6 py-4 text-sm text-dark ">{shift._id}</td>
      <td className="px-6 py-4 text-sm text-dark ">
        {isSuccess ? user[0].name : 'unnamed'}
      </td>
      <td className="px-6 py-4 text-sm text-dark ">
        {shift.closed ? 'Mbyllur' : 'Hapur'}
      </td>
      {isSuccess && (
        <td className="px-6 py-4 text-sm text-dark ">{user[0].createdAt}</td>
      )}
      <td className="text-sm text-dark  font-light px-6 py-4">
        {!shift.closed ? (
          <button
            className="bg-primary text-white px-2 py-1 rounded font-semibold"
            onClick={() => close(shift._id)}
          >
            Mbylle
          </button>
        ) : (
          <button
            disabled
            className="bg-gray-400 text-white px-2 py-1 rounded font-semibold"
          >
            Mbylle
          </button>
        )}
      </td>
    </tr>
  )
}
