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
  const { user, hasPermission } = useSelector((state) => state.auth)
  const [lastShift, setLastShift] = useState({ user: '', total: 0 })

  useEffect(() => {
    dispatch(getOrders())
    dispatch(getRecords())
    dispatch(ordersTotal())

    if (isError) {
      console.log(message)
    }

    if (!user.permission) {
      // navigate('/error/401')
    }

    return () => {
      dispatch(reset())
    }
  }, [dispatch, isError, message, navigate])
  console.log(hasPermission)
  useEffect(() => {
    if (records.length > 0) {
      setLastShift({ user: records[0].user, total: records[0].total })
    }
  }, [records])

  const convertDate = (date) => {
    let convertDate = new Date(date)

    return convertDate.toLocaleString('de-DE')
  }

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
        <div className="mt-5">
          <div className="flex justify-center md:space-x-5">
            <div className="w-full md:w-fit md:border-2 border-dark px-5 mb-5 rounded">
              {/* <span className="mx-5 md:mx-5 text-center text-xs font-bold uppercase">
                Ndrrimi aktual
              </span> */}
              <div className="flex flex-row justify-center">
                <span className="text-secondary text-4xl">
                  <FontAwesomeIcon icon={faEuroSign} />
                </span>
                <div className="ml-5 font-bold text-dark">
                  <p className="text-3xl">{total.total}&euro;</p>
                  <p>{total.user}</p>
                </div>
              </div>
            </div>
            <span className="border-l-2 border-secondary h-14"></span>
            <div className="w-full md:w-fit md:border-2 border-dark px-5 mb-5 rounded">
              {/* <span className="mx-5 md:mx-5 text-center text-xs font-bold uppercase">
                Ndrrimi i kalun
              </span> */}
              <div className="flex flex-row justify-center">
                <span className="text-secondary text-4xl">
                  <FontAwesomeIcon icon={faEuroSign} />
                </span>
                <div className="ml-5 font-bold text-dark">
                  <p className="text-3xl">{lastShift.total}&euro;</p>
                  <p>{lastShift.user}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center md:gap-5">
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
