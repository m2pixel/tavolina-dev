import React from 'react'

export default function Item({ order, record }) {
  const convertDate = (date) => {
    let convertDate = new Date(date)

    return convertDate.toLocaleString('eit-it')
  }
  console.log(order)
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {order ? order.name : convertDate(record.createdAt)}
      </th>
      <td className="px-6 py-2">
        {order ? order.price.toFixed(2) : record.total.toFixed(2)}&euro;
      </td>
    </tr>
  )
}
