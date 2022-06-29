import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

export default function TableItem({ status, order, deleteItem }) {
  const style =
    status === 'orders'
      ? 'border border-dark text-center font-semibold '
      : 'border border-dark bg-secondary bg-opacity-40 text-center font-semibold '

  return (
    <tr key={order._id} className={style} title={order.time}>
      <td className="border border-dark">{order.name}</td>
      <td className="border border-dark">{order.qty}</td>
      <td className="border border-dark">{order.price.toFixed(2)} &euro;</td>
      {status === 'currentOrder' && (
        <td
          onClick={() => deleteItem(order.order_id)}
          className="cursor-pointer hover:text-primary"
        >
          <FontAwesomeIcon icon={faDeleteLeft} />
        </td>
      )}
    </tr>
  )
}
