import React, { useEffect } from 'react'

export default function TableItem({ order, deleteItem, total }) {
  useEffect(() => {
    // total(order.qty * order.price)
    console.log(order.qty)
  }, [])
  return (
    <tr
      key={order._id}
      className="border border-secondary text-center font-semibold hover:bg-secondary"
      onDoubleClick={() => deleteItem(order._id)}
    >
      <td className="border-x border-secondary">{order.name}</td>
      <td className="border-x border-secondary">{order.qty}</td>
      <td className="border-x border-secondary">{order.price} &euro;</td>
    </tr>
  )
}
