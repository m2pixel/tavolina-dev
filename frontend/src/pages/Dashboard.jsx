import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Item from '../components/dashboard/Item'
import {
  getOrders,
  getRecords,
  reset,
} from '../features/dashboard/dashboardSlice'
import Card from '../components/Card'
import Spinner from '../components/Spinner'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orders, records, message, isError, isSuccess, isLoading } =
    useSelector((state) => state.dashboard)

  const handleKeyPress = useCallback((event) => {
    console.log(`key pressed: ${event.key}`)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])
  useEffect(() => {
    dispatch(getOrders())
    dispatch(getRecords())

    if (isError) {
      console.log(message)
    }

    return () => {
      dispatch(reset())
    }
  }, [dispatch, isError, message])

  const initialOrders = orders.map((order) => {
    return order.map((o) => {
      return <Item order={o} key={o._id} />
    })
  })

  const initialRecords = records.map((record) => {
    return <Item key={record._id} record={record} />
  })

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container md:mx-auto mb-5">
          <div className="flex flex-col md:flex-row lg:flex-wrap justify-center  mx-5 gap-5">
            <Card
              key="abc"
              title="5 porosite e fundit"
              list={initialOrders}
              titleHead={['emri', 'çmimi']}
            />
            <Card
              key="efg"
              title="8 ndrrimet e fundit"
              list={initialRecords}
              titleHead={['Data', 'Kamarieri', 'totali']}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
