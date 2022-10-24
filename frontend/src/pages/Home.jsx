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
  const localUser = JSON.parse(localStorage.getItem('user'))
  const { tables } = useSelector((state) => state.tables)
  const shift = useSelector((state) => state.shifts)
  const dispatch = useDispatch()
  const [hasShift, setHasShift] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getShift(user._id))
    }

    if (shift.isError) {
      console.log(shift.message)
    }
  }, [dispatch, user, shift.isError, shift.message])

  useEffect(() => {
    if (shift.isSuccess || shift.shift.length === 0) {
      if (Object.keys(shift.shift).length > 0) {
        setHasShift((prev) => true)
        dispatch(getTables())
      }
    }
  }, [dispatch, shift.shift, shift.isSucces])

  const openUserShift = (id) => {
    dispatch(createShift({ id: id }))
    setHasShift((prev) => true)
  }

  if (shift.isLoading) {
    return <Spinner />
  }

  const showTables = tables?.map((table) => (
    <Link key={table._id} to={`/table/${table._id}`}>
      <Table table={table} />
    </Link>
  ))

  return (
    <div className="">
      <p className="text-right">user:</p>
      {hasShift ? (
        <div className="flex flex-wrap gap-2 md:gap-5 justify-around mx-2 md:mx-6">
          {showTables}
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={() => openUserShift(user._id)}
            className="border-2 border-secondary rounded py-2 px-10 font-semibold hover:bg-secondary"
          >
            Fillo ndrrimin
          </button>
        </div>
      )}
    </div>
  )
}
