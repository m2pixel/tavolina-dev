import React from 'react'

export default function Card({ title, list, titleHead }) {
  return (
    <div className="w-1/3 shadow-2xl rounded">
      <div className="w-full bg-dark text-white py-1 text-center font-semibold rounded-t border-b-2 border-primary">
        <span>{title}</span>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
