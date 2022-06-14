import React from 'react'

export default function Item({ order, record }) {
  const convertDate = (date) => {
    let convertDate = new Date(date)

    return convertDate.toLocaleString('de-DE')
  }
  return (
    <tr className="text-xs md:text-sm  bg-white border-b">
      <th
        scope="row"
        className="md:px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
      >
        {order ? order.name : convertDate(record.createdAt)}
      </th>
      {record && <td className="px-2 py-2">{record.user}</td>}
      <td className="px-2 py-2">
        {order ? order.price.toFixed(2) : record.total.toFixed(2)}&euro;
      </td>
    </tr>
  )
}
