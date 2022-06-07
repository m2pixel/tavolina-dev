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

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="">
          <h2 className="flex justify-center font-semibold">
            Menaxhimi i tavolinave
          </h2>
          {showForm ? (
            <TableForm reload={reloadAfterAddTable} />
          ) : (
            <div>
              <div className="flex justify-end mx-10">
                <div
                  onClick={() => setShowForm((curr) => true)}
                  className="w-36 flex items-center justify-around cursor-pointer px-2 bg-dark text-primary rounded py-1 hover:text-secondary"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <p className="font-semibold">Shto tavoline</p>
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
