import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../../Spinner'
import UserForm from './UserForm'
import UserItems from './UserItems'
import { getUsers, deleteUser, reset } from '../../../features/users/userSlice'

export default function Tables() {
  const [showForm, setShowForm] = useState(false)
  const [msg, setMsg] = useState('')
  const dispatch = useDispatch()
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  )

  const deleteUserUI = (id) => {
    if (id) {
      dispatch(deleteUser(id))
      setMsg('User deleted')
    }
  }

  const reloadAfterAddTable = () => {
    setShowForm((prev) => false)
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getUsers())
    setMsg((prev) => '')
    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch, msg])

  const usersItems = users.map((user) => {
    return <UserItems key={user._id} user={user} deleteUserUI={deleteUserUI} />
  })

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="">
          <h2 className="flex justify-center font-semibold">
            Menaxhimi i perdoruesve
          </h2>
          {showForm ? (
            <UserForm reload={reloadAfterAddTable} />
          ) : (
            <div>
              <div className="flex justify-end mx-10">
                <div
                  onClick={() => setShowForm((curr) => true)}
                  className="w-40 flex items-center justify-around cursor-pointer px-2 bg-dark text-primary rounded py-1 hover:text-secondary"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <p className="font-semibold">Shto perdorues</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead className="border-b">
                          <tr>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark px-6 py-4 text-left"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark px-6 py-4 text-left"
                            >
                              email
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark px-6 py-4 text-left"
                            >
                              Role
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark  px-6 py-4 text-left"
                            >
                              Edit
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark  px-6 py-4 text-left"
                            >
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody>{usersItems}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
