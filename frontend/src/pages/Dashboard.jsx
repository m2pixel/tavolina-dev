import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Item from '../components/dashboard/Item'
import {
  getOrders,
  getRecords,
  reset,
} from '../features/dashboard/dashboardSlice'
import Card from '../components/Card'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orders, records, message, isError, isSuccess, isLoading } =
    useSelector((state) => state.dashboard)

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
      <div className="container mx-auto flex flex-row space-x-2">
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
          titleHead={['data', 'çmimi']}
        />
      </div>
    </>
  )
}

export default Dashboard
