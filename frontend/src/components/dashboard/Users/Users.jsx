import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../../Spinner'
import UserForm from './UserForm'
import UserItems from './UserItems'
import { getUsers, deleteUser, reset } from '../../../features/users/userSlice'
import { toast } from 'react-toastify'
import Button from '../../Button'

export default function Tables() {
  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch()
  const { users, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.users
  )

  const deleteUserUI = (id) => {
    if (id) {
      dispatch(deleteUser(id))
    }
  }

  const reloadAfterAddTable = () => {
    setShowForm((prev) => false)
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    } else if (isSuccess && message !== '') {
      toast.success(message)
    }

    dispatch(getUsers())

    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  console.log(message)
  const usersItems = users.map((user) => {
    return <UserItems key={user._id} user={user} deleteUserUI={deleteUserUI} />
  })
  const toggle = () => {
    setShowForm((curr) => true)
  }
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
              <div className="flex justify-end mx-5 my-5">
                <Button
                  title="Shto perdorues"
                  icon={faPlus}
                  action={toggle}
                  buttonStyle={5}
                />
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
