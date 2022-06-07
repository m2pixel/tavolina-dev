import React, { useEffect, useState } from 'react'
import {
  getShifts,
  closeShift,
  reset,
} from '../../../features/shifts/shiftSlice'
import { getUsers } from '../../../features/users/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../Spinner'
import ShiftItem from './ShiftItem'
import { toast } from 'react-toastify'

export default function Shift() {
  const dispatch = useDispatch()

  const { shifts, isLoading, message, isError, isSuccess } = useSelector(
    (state) => state.shifts
  )
  // const [user, setUser] = useState({ name: '' })
  const { users } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getShifts())
    dispatch(getUsers())
    return () => {
      dispatch(reset())
    }
  }, [dispatch])
  // console.log(users)
  const close = (id) => {
    dispatch(closeShift(id))

    if (isError) {
      toast.error(message)
    } else if (isSuccess) {
      toast.success('Ndrrimi u mbyll')
    }
  }

  const shiftList = shifts?.map((shift) => {
    let name = ''
    users.map((user) => {
      if (shift.user === user._id) {
        name = user.name
      }
      return name
    })
    return <ShiftItem key={shift._id} shift={shift} user={name} close={close} />
  })

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="">
          <h2 className="flex justify-center font-semibold">
            Menaxhimi i ndrrimeve
          </h2>
          <div>
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
                            Ndrrimi
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-dark  px-6 py-4 text-left"
                          >
                            Kamarieri
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-dark  px-6 py-4 text-left"
                          >
                            Hapja
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-dark  px-6 py-4 text-left"
                          >
                            Statusi
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-dark  px-6 py-4 text-left"
                          >
                            Mbylle
                          </th>
                        </tr>
                      </thead>
                      <tbody>{shiftList}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
