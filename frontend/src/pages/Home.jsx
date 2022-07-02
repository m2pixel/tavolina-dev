import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getTables } from '../features/tables/tableSlice'
import { createShift, getShift } from '../features/shifts/shiftSlice'
import Table from '../components/Table'
import Spinner from '../components/Spinner'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { tables, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tables
  )
  const shift = useSelector((state) => state.shifts)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getShift(user._id))
    }
  }, [dispatch, navigate, shift.isSuccess])

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (Object.keys(shift.shift).length > 0) {
      dispatch(getTables())
    }
  }, [dispatch, isError, message, shift.shift])

  const openUserShift = (id) => {
    dispatch(createShift({ id: id }))
  }

  const showTables = tables.map((table) => (
    <Link key={table._id} to={`/table/${table._id}`}>
      <Table table={table} user={user} />
    </Link>
  ))

  return (
    <div className="container mx-auto space-grotesk my-5">
      {isLoading || shift.isLoading ? (
        <Spinner />
      ) : (
        <div>
          {shift.shift.length === 0 ? (
            <div className="flex justify-center">
              <button
                onClick={() => openUserShift(user._id)}
                className="border-2 border-secondary rounded py-2 px-10 font-semibold hover:bg-secondary"
              >
                Fillo ndrrimin
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 md:gap-5 justify-around md:mx-6">
              {showTables}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
