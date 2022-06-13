import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TableItem from './TableItem'
import TableForm from './TableForm'
import {
  getTables,
  deleteTable,
  reset,
} from '../../../features/tables/tableSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../../Spinner'
import Button from '../../Button'

export default function Tables() {
  const [showForm, setShowForm] = useState(false)
  const [msg, setMsg] = useState('')
  const dispatch = useDispatch()
  // const navigate = useNavigator()
  const { tables, isLoading, isError, message } = useSelector(
    (state) => state.tables
  )

  const deleteTableUI = (id) => {
    if (id) {
      dispatch(deleteTable(id))
      setMsg('Table deleted')
    }
  }

  const reloadAfterAddTable = () => {
    setShowForm((prev) => false)
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getTables())
    setMsg((prev) => '')
    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch, msg])

  const tableItems = tables.map((table) => {
    return (
      <TableItem key={table._id} table={table} deleteTable={deleteTableUI} />
    )
  })

  const toggle = () => {
    setShowForm((prev) => true)
  }
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto">
          <h2 className="text-center font-semibold">Menaxhimi i tavolinave</h2>
          {showForm ? (
            <TableForm reload={reloadAfterAddTable} />
          ) : (
            <div className="">
              <div className="flex justify-end mx-5">
                <Button
                  title="Shto Tavoline"
                  icon={faPlus}
                  action={toggle}
                  buttonStyle={5}
                />
              </div>
              <div className="flex flex-col items-center">
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
                        <tbody>{tableItems}</tbody>
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
