import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createOrder, getOrders } from '../features/orders/orderSlice'
import TableItem from '../components/TableItem'
import { toast } from 'react-toastify'
import Spinner from './Spinner'

export default function TableData({ ordersUI, table, deleteItem }) {
  const { order, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.orders
  )
  const [total, setTotal] = useState(() => 0)

  const id = table._id
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getOrders({ table: id }))
  }, [dispatch, isError, message])

  useEffect(() => {
    
  }, [total])
 
  const showOrders = ordersUI?.map((order) => {
    return (
      <TableItem
        key={order._id}
        order={order}
        // total={totalPrice}
        deleteItem={deleteItem}
      />
    )
  })

  const ordered = order?.map(({ orders }) => {
    return orders?.map((o) => {
      return (
        <TableItem
          key={orders._id}
          order={o}
          // total={totalPrice}
          deleteItem={deleteItem}
        />
      )
    })
  })

  return (
    <div className="overflow-x-auto">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mx-5">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Emri</th>
                <th>Sasia</th>
                <th>Cmimi</th>
              </tr>
            </thead>
            <tbody>{ordered}</tbody>
            <tbody>{showOrders}</tbody>
          </table>
          <div className="flex justify-end py-2">
            <span className="w-40 text-center bg-secondary font-bold text-xl py-2">
              {total} &euro;
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
