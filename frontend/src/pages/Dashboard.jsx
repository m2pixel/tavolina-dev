import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Item from '../components/dashboard/Item'
import uuid from 'react-uuid'
import {
  getOrders,
  getRecords,
  ordersTotal,
  reset,
} from '../features/dashboard/dashboardSlice'
import { faEuro, faEuroSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from '../components/Card'
import Spinner from '../components/Spinner'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orders, records, total, message, isError, isSuccess, isLoading } =
    useSelector((state) => state.dashboard)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getOrders())
    dispatch(getRecords())
    dispatch(ordersTotal())

    if (isError) {
      console.log(message)
    }

    if (!user.permission) {
      navigate('/error/401')
    }
    return () => {
      dispatch(reset())
    }
  }, [dispatch, isError, message, navigate])

  const convertDate = (date) => {
    let convertDate = new Date(date)

    return convertDate.toLocaleString('de-DE')
  }

  console.log(total)

  const initialOrders = orders?.map((order) => {
    return order?.map((o) => {
      return (
        <tr key={o.order_id} className="text-xs md:text-sm  bg-white border-b">
          <th
            scope="row"
            className="md:px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
          >
            {o.name}
          </th>
          <th
            scope="row"
            className="md:px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
          >
            {convertDate(o.time)}
          </th>
          <th
            scope="row"
            className="md:px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
          >
            {o.table}
          </th>
          <th
            scope="row"
            className="md:px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
          >
            {o.price.toFixed(2)}&euro;
          </th>
        </tr>
      )
    })
  })

  const initialRecords = records?.map((record) => {
    return (
      <tr key={record._id} className="text-xs md:text-sm  bg-white border-b">
        <th
          scope="row"
          className="md:px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
        >
          {convertDate(record.createdAt)}
        </th>
        <th
          scope="row"
          className="md:px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
        >
          {record.user}
        </th>
        <th
          scope="row"
          className="md:px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
        >
          {record.total.toFixed(2)}&euro;
        </th>
      </tr>
    )
  })

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-5md:mx-auto my-5">
          <div className="flex justify-center">
            <div className="w-full md:w-fit flex flex-row justify-center items-center border border-dark rounded px-5 py-2 mb-5 space-y-2">
              <span className="text-secondary text-4xl">
                <FontAwesomeIcon icon={faEuroSign} />
              </span>
              <div className="ml-5 font-bold text-dark">
                <p className="text-3xl">{total.total}</p>
                <p>{total.user}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-wrap justify-center md:gap-5">
            <Card
              key={uuid()}
              title="Porosite e fundit"
              list={initialOrders}
              titleHead={['Produkti', 'Koha', 'tavolina', 'çmimi']}
            />
            <Card
              key={uuid()}
              title="Ndrrimet e fundit"
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
