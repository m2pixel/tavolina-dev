import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getTables } from '../features/tables/tableSlice'
import Table from '../components/Table'
import Spinner from '../components/Spinner'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { tables, isLoading } = useSelector((state) => state.tables)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    dispatch(getTables())
  }, [dispatch])

  const showTables = tables.map((table) => (
    <Link key={table._id} to={`/${table.name}`}>
      <Table table={table} user={user} />
    </Link>
  ))

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container md:mx-auto">
          <div className="flex flex-wrap justify-around md:justify-start space-x-5 space-y-5">
            {showTables}
          </div>
        </div>
      )}
    </>
  )
}
