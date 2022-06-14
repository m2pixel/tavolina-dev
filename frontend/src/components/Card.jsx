import React from 'react'

export default function Card({ title, list, titleHead }) {
  return (
    <div className="w-auto md:w-auto shadow-2xl rounded">
      <div className="w-full bg-dark text-white py-2 uppercase text-center font-semibold rounded-t border-b-2 border-primary">
        <span>{title}</span>
      </div>

      <table className="w-full text-center text-gray-500">
        <thead className="xs:text-xs text-gray-700 uppercase bg-gray-200 ">
          <tr>
            {titleHead.map((th) => (
              <th scope="col" class="px-6 py-3">
                {th}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
    </div>
  )
}
