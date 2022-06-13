import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

export default function TableItem({ status, order, deleteItem }) {
  const style =
    status === 'orders'
      ? 'border border-secondary text-center font-semibold hover:bg-secondary'
      : 'border border-secondary bg-emerald-200 text-center font-semibold hover:bg-secondary'

  return (
    <tr key={order._id} className={style}>
      <td className="border-x border-secondary">{order.name}</td>
      <td className="border-x border-secondary">{order.qty}</td>
      <td className="border-x border-secondary">
        {order.price.toFixed(2)} &euro;
      </td>
      {status === 'currentOrder' && (
        <td
          onClick={() => deleteItem(order.order_id)}
          className="text-rose-500 cursor-pointer"
        >
          <FontAwesomeIcon icon={faDeleteLeft} />
        </td>
      )}
    </tr>
  )
}
