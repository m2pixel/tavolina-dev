import React, { useEffect } from 'react'
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
  const { users } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getShifts())
    dispatch(getUsers())

    if (isError) {
      message !== '' && toast.error(message)
    } else if (isSuccess) {
      message !== '' && toast.info(message)
    }

    return () => {
      dispatch(reset())
    }
  }, [dispatch, message, isError])

  const close = (id) => {
    dispatch(closeShift(id))
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
        <div className="md:container md:mx-auto mt-5">
          <h2 className="flex justify-center font-semibold">
            Menaxhimi i ndrrimeve
          </h2>
          <div>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="w-full table-auto text-center">
                      <thead className="border-b">
                        <tr>
                          <th
                            scope="col"
                            className="text-sm font-medium text-dark px-6 py-4 text-center"
                          >
                            Hapja
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-dark px-6 py-4 text-center"
                          >
                            Mbyllja
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-dark  px-6 py-4 text-center"
                          >
                            Kamarieri
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-dark  px-6 py-4 text-center"
                          >
                            Statusi
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-dark  px-6 py-4 text-center"
                          >
                            Mbylle (Shfaqe)
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
