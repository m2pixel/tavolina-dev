import React, { useEffect, useState } from 'react'

export default function TableItem({ status, order, deleteItem }) {
  const [showDelete, setShowDelete] = useState(false)
  const style =
    status === 'orders'
      ? 'border border-secondary text-center font-semibold hover:bg-secondary'
      : 'border border-secondary bg-emerald-200 text-center font-semibold hover:bg-secondary'

  console.log('order: ', order)
  return (
    <tr key={order._id} className={style}>
      <td className="border-x border-secondary">{order.name}</td>
      <td className="border-x border-secondary">{order.qty}</td>
      <td className="border-x border-secondary">{order.price} &euro;</td>
      {status === 'currentOrder' && (
        <td
          onClick={() => deleteItem(order.order_id)}
          className="text-rose-500 cursor-pointer"
        >
          X
        </td>
      )}
    </tr>
  )
}
